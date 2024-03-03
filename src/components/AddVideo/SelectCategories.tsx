"use client";
import React, {SyntheticEvent, useEffect} from 'react';
import {Autocomplete, Box, Stack, TextField} from "@mui/material";
import {BaseResponse} from "../../type/base-response";
import {BasePath, getBaseRequest} from "../../helper/api";
import {seasonOfYearArr} from "../../const/season-of-year";
import {videoTypeArr} from "../../const/video-type-enum";
import {videoCategoryArr} from "../../const/video-category";
import {videoStatusArr} from "../../const/video-status";


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
}

function SelectCategories({savaChange}: SelectCategoriesProps) {
  const [ageRating, setAgeRating] = React.useState<BaseResponse[]>([]);
  const [genre, setGenre] = React.useState<BaseResponse[]>([]);
  const [publisher, setPublisher] = React.useState<BaseResponse[]>([]);

  const [seasonOfYear, setSeasonOfYear] = React.useState<any>(seasonOfYearArr[0])
  const [typeSelect, setTypeSelect] = React.useState<any>(videoTypeArr[0]);
  const [categorySelect, setCategorySelect] = React.useState<any>(videoCategoryArr[0]);
  const [statusSelect, setStatusSelect] = React.useState<any>(videoStatusArr[0]);

  const [publisherSelect, setPublisherSelect] = React.useState<BaseResponse>({id: 0, name: 'None'});
  const [genreSelect, setGenreSelect] = React.useState<BaseResponse[]>([]);
  const [ageRatingSelect, setAgeRatingSelect] = React.useState<BaseResponse>({id: 0, name: 'None'});

  useEffect(() => {
    savaChange({
      ageRatingId: ageRatingSelect?.id, publisherId: publisherSelect?.id,
      type: typeSelect?.key, status: statusSelect?.key, seasonOfYear: seasonOfYear?.key,
      videoCategory: categorySelect?.key, genreIds: genreSelect.map(value => value.id)
    });

  }, [seasonOfYear, genreSelect, typeSelect, categorySelect, publisherSelect, statusSelect, ageRatingSelect, savaChange]);

  const renderFilter = [
    {title: 'Видавець', options: publisher, action: handleChangePublisher, value: publisherSelect},
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
    console.log('Arr', newValue)
    setGenreSelect(() => newValue);
  };

  async function initData() {
    const publisher = await getBaseRequest(BasePath.publisher);
    setPublisher(publisher);

    const ageRating = await getBaseRequest(BasePath.ageRating);
    setAgeRating(ageRating);

    const genre = await getBaseRequest(BasePath.genre);
    setGenre(genre);
  }

  React.useEffect(() => {
    initData().then();
  }, [])
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


    </Stack>
  )
    ;
}

export default SelectCategories;
