import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import SelectCategories, {SaveCategories} from "./SelectCategories";
import VideoService from "../../../service/video.service";
import LoadPicture from "../../UploadFile/LoadPicture";
import LoadArrPictures from "../../UploadFile/LoadArrPictures";
import EditFieldsArr from "../EditField/EditFieldsArr";
import CreateVideoSeriesList from "../CreateVideoSeries/CreateVideoSeriesList";
import {CreateSeries} from 'type';

function CreateVideo() {
  const [names, setNames] = React.useState<string[]>([]);
  const [trailers, setTrailers] = React.useState<string[]>([]);
  const [categories, setCategories] = useState<SaveCategories>();
  const [icon, setIcon] = useState<File | null>();
  const [pictures, setPictures] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');
  const [dateRelease, setDateRelease] = useState<Date>(new Date());
  const [mainCharacter, setMainCharacter] = useState<string[]>([]);
  const [series, setSeries] = useState<CreateSeries[]>([]);

  const [duration, setDuration] = useState<string>('')
  const [count, setCount] = useState<number>(0);

  function handleChangeDateRelease(value: any) {
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    console.log('dateRelease', date);
    setDateRelease(date);
  }

  function handleCreateVideo() {
    if (!icon || !categories || !categories.genreIds || !categories.type || !categories.seasonOfYear
      || !categories.status || !categories.videoCategory || !categories.publisherId || !categories.ageRatingId
      || !description || mainCharacter.length <= 0 || !duration
    ) {
      return;
    }

    const form = new FormData();
    names.forEach(value => form.append('name', value));
    form.append('icon', icon, icon.name);
    pictures.forEach(value => form.append('pictures', value, value.name));
    trailers.forEach(value => form.append('trailers', value));
    form.append('dateRelease', dateRelease.toISOString());
    categories.genreIds.forEach(value => form.append('genreIds', value.toString()));
    form.append('type', categories.type);
    form.append('seasonOfYear', categories.seasonOfYear);
    form.append('status', categories.status);
    form.append('videoCategory', categories.videoCategory);
    form.append('publisherId', categories.publisherId.toString());
    form.append('ageRatingId', categories.ageRatingId.toString());
    form.append('description', description);
    mainCharacter.forEach(value => form.append('mainCharacters', value));
    form.append('countSeries', count.toString());
    form.append('duration', duration);
    series.forEach(value => {
      form.append('series', JSON.stringify(value));
    });
    const formValues: any[] = []
    form.forEach((value, key) => formValues.push({key, value,}))
    console.log(formValues);

    VideoService.create(form)
      .then(value => {
        console.log("Create video", value);
      })
      .catch(reason => {
        console.log('Error create video', reason);
      })
  }

  useEffect(() => {
  }, [names]);

  return (
    <Stack spacing={2}>
      <Button onClick={handleCreateVideo} variant="contained" sx={{mb: 4}} size="large">Зберегти</Button>
      <Stack sx={{flexDirection: {xs: 'column', md: 'row'}}}>
        <LoadPicture setLoadFile={setIcon}/>
        <Stack spacing={2} flexGrow={1}>
          <EditFieldsArr minFields={1} setValue={setNames} label={'Назви'}/>
          <SelectCategories
            savaChange={setCategories}/>
          <DatePicker value={dayjs(dateRelease)}
                      onChange={handleChangeDateRelease}
          />
          <TextField onChange={event => setDuration(event.target.value)}
                     fullWidth size={'small'} id="duration"
                     label="Тривалість" variant="outlined"/>
          <TextField onChange={event => setCount(parseInt(event.target.value))}
                     fullWidth type='number' size={'small'} id="duration" label="Кількість серій" variant="outlined"/>

          <EditFieldsArr minFields={1} setValue={setMainCharacter} label={'Головні герої'}/>

        </Stack>
      </Stack>
      <TextField rows={12} margin='normal'
                 value={description}
                 onChange={event => setDescription(event.target.value)}
                 multiline size={'small'} id="description" label="Опис відео" variant="outlined"/>
      <CreateVideoSeriesList save={setSeries}/>
      <Paper elevation={4}>
        <Stack direction='column' p={1} spacing={1}>
          <Typography variant='h6'>Трейлери</Typography>
          <EditFieldsArr minFields={0} setValue={setTrailers} label={'Трейлери'}/>
        </Stack>
      </Paper>

      <Paper elevation={4}>
        <Box p={1}>
          <LoadArrPictures setLoadFile={setPictures}/>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CreateVideo;
