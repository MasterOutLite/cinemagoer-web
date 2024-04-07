import React, {SyntheticEvent, useEffect} from 'react';
import {Autocomplete, Box, Stack, TextField} from "@mui/material";
import {useAgeRatingStore} from 'store/useAgeRatingStore';
import {useGenreStore} from 'store/useGenreStore';
import {seasonOfYearArr} from 'const/season-of-year';
import {usePublisherStore} from 'store/usePublisherStore';
import {videoTypeArr} from 'const/video-type';
import {videoCategoryArr} from 'const/video-category';
import {videoStatusArr} from 'const/video-status';
import {BaseResponse} from 'type';
import RenderPublisher from "../../RenderPublisher/RenderPublisher";


export type SaveCategories = {
  genreIds: number[];
  type: string;
  status: string;
  videoCategory: string;
  publisherId: number;
  ageRatingId: number;
  seasonOfYear: string;
}

export interface SelectCategoriesProps {
  savaChange: (object: SaveCategories) => void,
  init?: SaveCategories,
}

function SelectCategories({savaChange, init}: SelectCategoriesProps) {
  const {ageRating, getAgeRating} = useAgeRatingStore();
  const {genre, getGenre} = useGenreStore();
  const {publisher, getPublisher} = usePublisherStore();

  const [seasonOfYear, setSeasonOfYear] =
    React.useState<any>(init?.seasonOfYear ?
      seasonOfYearArr.find(value => value.key == init?.seasonOfYear)
      : seasonOfYearArr[0]);
  const [typeSelect, setTypeSelect] =
    React.useState<any>(init?.type ? videoTypeArr.find(value => value.key == init.type) : videoTypeArr[0]);
  const [categorySelect, setCategorySelect] =
    React.useState<any>(init?.videoCategory ? videoCategoryArr.find(value => value.key == init.videoCategory)
      : videoCategoryArr[0]);
  const [statusSelect, setStatusSelect] =
    React.useState<any>(init?.status ? videoStatusArr.find(value => value.key == init.status) : videoStatusArr[0]);

  const [publisherSelect, setPublisherSelect] =
    React.useState<BaseResponse | null>(null);

  const [genreSelect, setGenreSelect] =
    React.useState<BaseResponse[]>([]);
  const [ageRatingSelect, setAgeRatingSelect] =
    React.useState<BaseResponse | null>(null);

  useEffect(() => {
    if (ageRatingSelect && publisherSelect)
      savaChange({
        ageRatingId: ageRatingSelect?.id, publisherId: publisherSelect?.id,
        type: typeSelect?.key, status: statusSelect?.key, seasonOfYear: seasonOfYear?.key,
        videoCategory: categorySelect?.key, genreIds: genreSelect.map(value => value.id)
      });

  }, [seasonOfYear, genreSelect, typeSelect, categorySelect, publisherSelect, statusSelect, ageRatingSelect, savaChange]);

  const renderFilter = [
    {title: 'Віковий рейтинг', options: ageRating, action: handleChangeAgeRating, value: ageRatingSelect},
  ];

  const renderEnum = [
    {title: 'Категорія відео', options: videoCategoryArr, action: handleChangeCategory, value: categorySelect},
    {title: 'Тип', options: videoTypeArr, action: handleChangeType, value: typeSelect},
    {title: 'Статус', options: videoStatusArr, action: handleChangeStatus, value: statusSelect},
    {title: 'Оберіть сезон виходу', options: seasonOfYearArr, action: handleChangeSeasonOfYear, value: seasonOfYear},
  ]

  function handleChangeSeasonOfYear(event: SyntheticEvent<Element, Event>, newValue: any) {
    setSeasonOfYear(newValue);
  }

  function handleChangeCategory(event: SyntheticEvent<Element, Event>, newValue: any) {
    setCategorySelect(newValue);
  }

  function handleChangePublisher(event: SyntheticEvent<Element, Event>, newValue: any) {
    setPublisherSelect(newValue);
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
    setGenreSelect(() => newValue);
  };

  React.useEffect(() => {
    getGenre();
    getPublisher();
    getAgeRating();
  }, [])

  useEffect(() => {
    if (!init) {
      return;
    }
    const initGenre = genre.filter(value => init.genreIds.includes(value.id));
    if (initGenre)
      setGenreSelect(initGenre)
    const initPublisher = publisher.find(value => value.id === init.publisherId);
    if (initPublisher)
      setPublisherSelect(initPublisher)
    const initAgeRating = ageRating.find(value => value.id === init.ageRatingId);
    if (initAgeRating)
      setAgeRatingSelect(initAgeRating)

  }, [genre, ageRating, publisher]);
  return (
    <Stack gap={2}>
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

      <RenderPublisher setValue={setPublisherSelect} init={publisher.find(value => value.id == init?.publisherId)}/>

      {
        renderFilter.map((value, index) => (
            <Autocomplete
              key={value.title}
              id={`checkboxes-${index}`}
              size={'small'}
              value={value.value}
              options={value.options}
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


    </Stack>
  )
    ;
}

export default SelectCategories;
