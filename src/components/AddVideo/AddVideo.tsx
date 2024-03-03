import React, {useEffect, useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddSeries, {CreateSeries} from "./AddSeries";
import SelectCategories, {SaveCategories} from "./SelectCategories";
import LoadPicture from "../RenderImg/LoadPicture";
import AddNameVideo from "./AddNameVideo";
import LoadStillsFromTheFilm from "../RenderImg/LoadStillsFromTheFilm";


function AddVideo() {
  const [names, setNames] = React.useState<string[]>([]);
  const [series, setSeries] = useState<CreateSeries[]>();
  const [categories, setCategories] = useState<SaveCategories>();
  const [icon, setIcon] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [dateRelease, setDateRelease] = useState<Date>(new Date());

  function handleChangeDateRelease(value: any) {
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    console.log('dateRelease', date);
    setDateRelease(date);
  }

  useEffect(() => {
    console.log('AddVideo:', 'Names', names);
  }, [names]);

  return (
    <Stack>
      <Button variant="contained" sx={{mb: 4}} size="large">Зберегти</Button>
      <Stack direction='row'>
        <LoadPicture/>
        <Stack gap={2} sx={{width: '100%'}}>
          <AddNameVideo setNameArr={setNames}/>
          <SelectCategories savaChange={setCategories}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(dateRelease)}
                        onChange={handleChangeDateRelease}
            />
          </LocalizationProvider>
          <TextField fullWidth size={'small'} id="duration" label="Тривалість" variant="outlined"/>
          <TextField multiline size={'small'} id="main-character" label="Головні герої" variant="outlined"/>
        </Stack>
      </Stack>
      <TextField rows={12} margin='normal'
                 value={description}
                 onChange={event => setDescription(event.target.value)}
                 multiline size={'small'} id="description" label="Опис відео" variant="outlined"/>
      <AddSeries saveChange={setSeries}/>
      <LoadStillsFromTheFilm/>
    </Stack>
  );
}

export default AddVideo;
