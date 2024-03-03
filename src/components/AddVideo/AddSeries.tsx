import React, {SyntheticEvent} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2";
import {grey} from "@mui/material/colors";
import dayjs from "dayjs";

export interface AddSeriesProps {
  saveChange: (series: CreateSeries[]) => void;
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

export type CreateSeries = {
  series: number;
  name: string;
  dayOfWeek: number;
  dateRelease: Date;
  release: boolean;
}

function AddSeries({saveChange}: AddSeriesProps) {
  const [series, setSeries] = React.useState<CreateSeries[]>(
    [{dayOfWeek: 1, name: '', series: 1, dateRelease: new Date(), release: false},
    ]
  );

  function handleChangeDayOfWeek(index: number) {
    return (event: SyntheticEvent<Element, Event>, newValue: any) => {
      console.log('Arr', newValue)
      setSeries(prevState => {
        const updatedSeries = [...prevState];
        updatedSeries[index] = {...updatedSeries[index], dayOfWeek: newValue.key};
        return updatedSeries;
      })
    };
  }

  function handleChangeName(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      series[index].name = event.target.value;
    }
  }

  function handleChangeChecked(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setSeries(prevState => {
        const updatedSeries = [...prevState];
        updatedSeries[index] = {...updatedSeries[index], release: checked};
        return updatedSeries;
      })
    }
  }

  function handleChangeData(index: number) {
    return (value: any) => {
      const parseDate = Date.parse(value);
      const date = new Date(parseDate);
      console.log(value);
      console.log(date);
      setSeries(prevState => {
        const updatedSeries = [...prevState];
        updatedSeries[index] = {...updatedSeries[index], dateRelease: date};
        return updatedSeries;
      })
    }
  }

  function handleSaveChange() {
    console.log('Save change', 'Complete: ', false)
    saveChange(series);
  }

  function handleAddSeries() {
    const lastSeries = series[series.length - 1];
    setSeries(prevState => [...prevState, {...lastSeries, name: '', series: lastSeries.series + 1}])
  }

  function handleRemoveSeries() {
    const newSeries = series.filter((value, index) => index !== series.length - 1);
    setSeries(() => newSeries);
  }

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Вихід серій</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{paddingX: 1}}>
          <Stack direction='row' justifyContent={'flex-end'} alignItems={'center'} gap={1}>
            <Button onClick={handleSaveChange} variant='contained' size={'medium'}>Зберегти зміни</Button>
            <Button onClick={handleAddSeries} variant='contained' size={'medium'}>Додати</Button>
            <Button onClick={handleRemoveSeries} variant='contained' size={'medium'}>Видалити</Button>
          </Stack>
          <Grid2 container direction={'row'}
                 sx={{background: grey[800], color: '#fff'}} py={1}>
            <Grid2 xs={2} sm={1}>
              <Typography pl={2} variant={'subtitle1'}>Номер</Typography>
            </Grid2>

            <Grid2 xs={6} sx={{display: {xs: 'none', sm: 'block'}}}>
              <Typography variant={'subtitle1'}>
                Назва серії
              </Typography>
            </Grid2>

            <Grid2 xs={6} sm={2}>
              <Typography>
                Дата виходу
              </Typography>
            </Grid2>

            <Grid2 xs={6} sm={2}>
              <Typography>
                День тижня
              </Typography>
            </Grid2>

            <Grid2 xs={1}>
              <Typography textAlign={'center'}>
                Статус
              </Typography>
            </Grid2>
          </Grid2>

          <Stack
            divider={<Divider/>}
            style={{maxHeight: 600, overflow: 'auto'}}
          >
            {series?.map((value, index) =>
              <Grid2 container key={value.series} direction={'row'} py={1}>
                <Grid2 xs={2} sm={1}>
                  <TextField fullWidth defaultValue={value.series} placeholder={'№ Номер серії'}/>
                </Grid2>

                <Grid2 xs={6} sx={{display: {xs: 'none', sm: 'block'}}}>
                  <TextField fullWidth
                             onChange={handleChangeName(index)}
                             defaultValue={value.name}
                             placeholder={'Введіть назву серії'}/>
                </Grid2>

                <Grid2 xs={6} sm={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dayjs(value.dateRelease)}
                      onChange={handleChangeData(index)}
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 xs={6} sm={2}>
                  <Autocomplete
                    id="select-day-of-week"
                    options={dayOfWeek}
                    disableCloseOnSelect
                    size={'medium'}
                    sx={{minWidth: 120}}
                    value={dayOfWeek[value.dayOfWeek - 1]}
                    isOptionEqualToValue={(option, value1) => option.key == value1.key}
                    onChange={handleChangeDayOfWeek(index)}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField {...params} label={'Оберіть день тижня'} placeholder="Виберіть із списку"/>
                    )}
                  />
                </Grid2>

                <Grid2 xs={1}>
                  <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <Checkbox checked={value.release}
                              onChange={handleChangeChecked(index)}
                              size="medium"/>
                  </Stack>
                </Grid2>

              </Grid2>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default AddSeries;
