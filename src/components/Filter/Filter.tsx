import React, {SyntheticEvent, useEffect} from 'react';
import {Autocomplete, Box, Button, Paper, Stack, SxProps, TextField, Theme} from "@mui/material";
import queryString from 'query-string';
import {videoTypeArr} from "../../const/video-type";
import {videoStatusArr} from "../../const/video-status";
import {BaseResponse} from "../../type/base-response";
import {VideoCategory, videoCategoryArr} from "../../const/video-category";
import Title from "../Title/Title";
import {seasonOfYearArr} from "../../const/season-of-year";
import {useLocation} from "react-router-dom";
import {FilterVideo} from "../../service/video.service";
import {useAgeRatingStore} from "../../store/useAgeRatingStore";
import {useGenreStore} from "../../store/useGenreStore";

export interface FilterProps {
  videoCategory: VideoCategory;
  setQuery: (value: FilterVideo) => void;
  sx?: SxProps<Theme>;
}

function Filter({videoCategory, setQuery, sx}: FilterProps) {
  const location = useLocation();
  const {ageRating, getAgeRating} = useAgeRatingStore();
  const {genre, getGenre} = useGenreStore();
  // const {publisher, getPublisher} = usePublisherStore();

  const [genreSelect, setGenreSelect] = React.useState<BaseResponse[]>([]);
  const [ageRatingSelect, setAgeRatingSelect] = React.useState<BaseResponse>();

  const [seasonOfYear, setSeasonOfYear] = React.useState<any>(null)
  const [typeSelect, setTypeSelect] = React.useState<any>(null);
  const [categorySelect, setCategorySelect] = React.useState<any>(null);
  const [statusSelect, setStatusSelect] = React.useState<any>(null);

  const [fromYear, setFromYear] = React.useState('');
  const [fromYearValid, setFromYearValid] = React.useState<boolean>(true);

  const [toYear, setToYear] = React.useState('');
  const [toYearValid, setToYearValid] = React.useState<boolean>(true);

  function handleChangeSeasonOfYear(event: SyntheticEvent<Element, Event>, newValue: any) {
    setSeasonOfYear(newValue);
  }

  function handleChangeCategory(event: SyntheticEvent<Element, Event>, newValue: any) {
    setCategorySelect(newValue);
  }

  function handleChangeType(event: SyntheticEvent<Element, Event>, newValue: any) {
    setTypeSelect(newValue);
  }

  function handleChangeStatus(event: SyntheticEvent<Element, Event>, newValue: any) {
    setStatusSelect(newValue);
  }

  function handleChangeAgeRating(event: SyntheticEvent<Element, Event>, newValue: any) {
    setAgeRatingSelect(newValue);
  }

  const handleChangeGenre = (event: SyntheticEvent<Element, Event>, newValue: BaseResponse[]) => {
    console.log('Arr', newValue)
    setGenreSelect(() => newValue);
  };

  function validYear(value: string) {
    const number = value.replace(/[^0-9]/g, '');
    return number.slice(0, 4);
  }

  const handleChangeFromYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {value},
    } = event

    let numberValid = validYear(value);
    if (numberValid.length >= 4 && numberValid <= '1900')
      numberValid = '1900';
    if (toYear && numberValid > toYear)
      numberValid = fromYear;

    setFromYear(() => numberValid);
    setFromYearValid(() => numberValid.length >= 4 && numberValid <= toYear || !numberValid);
  };

  const handleChangeToYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {value},
    } = event

    const numberValid = validYear(value);
    setToYear(() => numberValid);
    setToYearValid(() => numberValid.length >= 4 || !numberValid)
  };

  const handleRequest = () => {
    const obg = {
      genreIds: genreSelect.map(value => value.id),
      type: typeSelect?.key,
      seasonOfYear: seasonOfYear?.key,
      status: statusSelect?.key,
      ageRatingId: ageRatingSelect?.id,
      videoCategory: videoCategory,
      dateReleaseMin: fromYear,
      dateReleaseMax: toYear
    }
    console.log(obg);
    setQuery(obg);
  };

  const renderFilter = [
    {title: 'Віковий рейтинг', options: ageRating, action: handleChangeAgeRating, value: ageRatingSelect},
  ];

  const renderEnum = [
    {title: 'Категорія відео', options: videoCategoryArr, action: handleChangeCategory, value: categorySelect},
    {title: 'Тип', options: videoTypeArr, action: handleChangeType, value: typeSelect},
    {title: 'Статус', options: videoStatusArr, action: handleChangeStatus, value: statusSelect},
    {title: 'Оберіть сезон виходу', options: seasonOfYearArr, action: handleChangeSeasonOfYear, value: seasonOfYear},
  ]

  useEffect(() => {
    const parse = queryString.parse(location.search) as {
      genreIds?: number,
    };
    if (parse.genreIds) {
      setQuery({genreIds: [parse.genreIds], videoCategory});
      const genreFind = genre.find(value => value.id == parse.genreIds);
      console.log(genreFind);
      if (genreFind)
        setGenreSelect(() => [genreFind]);
    }
  }, [genre]);

  useEffect(() => {
    getGenre();
    getAgeRating();
  }, []);

  return (
    <Paper sx={sx} style={{maxWidth: '350px'}} elevation={4}>

      <Title sxTitle={{textAlign: 'center'}}>
        Фільтр
      </Title>
      <Stack p={1} mt={2} pb={3} gap={2}>

        <Autocomplete
          multiple
          id="checkboxes-genre"
          size={'small'}
          options={genre}
          disablePortal
          value={genreSelect}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeGenre}
          filterSelectedOptions
          renderInput={(params) => (
            <Box>
              <TextField {...params} label="Жанри"
                         placeholder="Напишіть або виберіть назву жанра"/>
            </Box>
          )}
        />


        {
          renderFilter.map((value) => (
              <Autocomplete
                key={value.title}
                id="checkboxes-tags-demo"
                size={'small'}
                options={value.options}
                disableCloseOnSelect
                onChange={value.action}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label={value.title} placeholder="Виберіть із списку"/>
                )}
              />
            )
          )
        }

        {
          renderEnum.map((enumRender, index) => (
            <Autocomplete
              key={enumRender.title}
              id={`select-${index}`}
              options={enumRender.options}
              size={'small'}
              value={enumRender.value}
              onChange={enumRender.action}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField {...params} label={enumRender.title} placeholder="Виберіть із списку"/>
              )}
            />
          ))
        }

        <Stack direction="row" spacing={2}>
          <TextField error={!fromYearValid} label="Від" variant="outlined" value={fromYear}
                     onChange={handleChangeFromYear}/>
          <TextField error={!toYearValid} label="До" variant="outlined" value={toYear}
                     onChange={handleChangeToYear}/>
        </Stack>


        <Button variant="contained" size={'large'} onClick={handleRequest}>Знайти</Button>
      </Stack>
    </Paper>
  );
}

export default Filter;
