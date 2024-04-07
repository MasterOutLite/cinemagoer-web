import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Checkbox, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {CreateSeries} from 'type';

export interface CreateVideoSeriesStateProps {
  series?: CreateSeries;
  remove: () => void;
}

const dayOfWeek = [
  {key: 1, value: 'Понеділок'},
  {key: 2, value: 'Вівторок'},
  {key: 3, value: 'Середа'},
  {key: 4, value: 'Четвер'},
  {key: 5, value: 'П\'ятниця'},
  {key: 6, value: 'Субота'},
  {key: 7, value: 'Неділя'},
]

function CreateVideoSeriesState({series,  remove}: CreateVideoSeriesStateProps) {
  const [number, setNumber] =
    useState<number>(series?.series || 1);
  const [numberOld, setNumberOld] =
    useState<number>(number);

  const [name, setName] =
    useState<string>(series?.name || '');
  const [nameOld, setNameOld] =
    useState<string>(name);

  const [dateRelease, setDateRelease] =
    useState<Date>(series?.dateRelease || new Date());

  const [release, setRelease] =
    useState<boolean>(series?.release || false);
  const [releaseOld, setReleaseOld] =
    useState<boolean>(release);

  const [day, setDay] =
    useState<number>(series?.dayOfWeek || 1);
  const [dayOld, setDayOld] =
    useState<number>(day);

  function handleChangeDayOfWeek(event: SyntheticEvent<Element, Event>, newValue: any) {
    setDay(newValue ? newValue.key : 1);
  }

  function handleBluerDayOfWeek() {
    if (day != dayOld)
      setDayOld(day);
  }

  function handleChangeData(value: any) {
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    setDateRelease(date);
  }


  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value;
    setName(newName);
  }

  function handleBluerName() {
    if (name !== nameOld)
      setNameOld(name);
  }

  function handleChangeChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setRelease(checked);
  }

  function handleBluerChecked() {
    if (release != releaseOld)
      setReleaseOld(release);
  }

  function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    setNumber(value);
    //remove when onBlur enable
    setNumberOld(value);
  }

  function handleBluerNumber() {
    if (number != numberOld)
      setNumberOld(number);
  }

  useEffect(() => {
    // save({name, series: number, release, dateRelease: dateRelease, dayOfWeek: day})
  }, [dayOld, numberOld, dateRelease, nameOld, releaseOld]);


  return (
    <Box>
      <Grid2 container spacing={1}>
        <Grid2 xs={6} md={1} order={1}>
          <TextField fullWidth
                     value={number}
                     type='number'
                     label='№'
            // onBlur={handleBluerNumber}
                     onChange={handleChangeNumber}
                     placeholder='№ Номер серії'/>
        </Grid2>

        <Grid2 xs={12} md={5} order={2}>
          <TextField fullWidth
                     onChange={handleChangeName}
                     onBlur={handleBluerName}
                     value={name}
                     label='Назва серії'
                     placeholder='Введіть назву серії'/>
        </Grid2>

        <Grid2 xs={6} md={2} order={3}>
          <DatePicker
            label='Дата виходу'
            sx={{width: '100%'}}
            value={dayjs(dateRelease)}
            onChange={handleChangeData}
          />
        </Grid2>
        <Grid2 xs={6} md={2} order={4}>
          <Autocomplete
            id="select-day-of-week-create-series"
            options={dayOfWeek}
            sx={{minWidth: 120}}
            value={dayOfWeek[day - 1]}
            isOptionEqualToValue={(option, value1) => option.key == value1.key}
            onChange={handleChangeDayOfWeek}
            onBlur={handleBluerDayOfWeek}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => (
              <TextField {...params} label='Оберіть день тижня' placeholder="Виберіть із списку"/>
            )}
          />
        </Grid2>

        <Grid2 xs={3} md={1} order={{xs: 1, md: 5}} display='flex' direction='row' alignItems='center'
               justifyContent='space-around'>
          <Checkbox checked={release}
                    onChange={handleChangeChecked}
                    onBlur={handleBluerChecked}
                    size="medium"/>
        </Grid2>

        <Grid2 xs={3} md={1} order={{xs: 1, md: 5}} display='flex' alignItems='center'
               justifyContent='center'>
          <Button variant='outlined' onClick={remove}>
            <DeleteIcon/>
          </Button>
        </Grid2>

      </Grid2>
    </Box>
  );
}

export default CreateVideoSeriesState;
