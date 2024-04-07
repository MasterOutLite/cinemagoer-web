import React, {useEffect, useState} from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import CreateVideoSeries from "./CreateVideoSeries";
import {v4 as uuidv4} from 'uuid';
import {CreateSeries} from 'type';

export interface CreateVideoSeriesListProps {
  minFieldsLength?: number
  save: (series: CreateSeries[]) => void;
}

type Series = CreateSeries & {
  uuid: string;
}

function CreateVideoSeriesList({minFieldsLength, save}: CreateVideoSeriesListProps) {

  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const minLength = minFieldsLength || 0;
    for (let i = 0; i < minLength; i++) {
      addSeries();
    }
  }, []);

  function addSeries() {
    let lastSeries = series[series.length - 1];
    if (!lastSeries) {
      lastSeries = {series: 0, name: '', dayOfWeek: 1, dateRelease: new Date(), release: false, uuid: ''};
    }
    setSeries(prevState => [...prevState, {
      ...lastSeries,
      uuid: uuidv4(),
      series: lastSeries.series + 1
    }])
  }

  function handleRemove(uuid: string) {
    return () => {
      const minLength = minFieldsLength || 0;
      if (series.length <= minLength)
        return;

      const newSeries = series.filter(value => value.uuid !== uuid);
      setSeries(newSeries);
      saveSeries(newSeries);
    }
  }

  function handleSave(uuid: string) {
    return (updateSeries: CreateSeries) => {
      const index = series.findIndex(value => value.uuid === uuid);
      const updatedSeries = [...series];
      updatedSeries[index] = {...updatedSeries[index], ...updateSeries};
      const sortedSeries = updatedSeries.sort((a, b) => a.series - b.series);
      setSeries(sortedSeries);
      saveSeries(sortedSeries);
    }
  }

  function saveSeries(series: Series[]) {
    const saveCreateSeries: CreateSeries[] = series.map(value =>
      ({
        dayOfWeek: value.dayOfWeek,
        series: value.series,
        name: value.name,
        dateRelease: value.dateRelease,
        release: value.release
      }));
    save(saveCreateSeries);
  }


  return (
    <Paper elevation={4}>
      <Stack spacing={1} p={1}>
        <Typography variant='h6'>Сірії</Typography>
        {
          series.map(value => (
            <CreateVideoSeries key={value.uuid} series={value}
                               remove={handleRemove(value.uuid)}
                               save={handleSave(value.uuid)}/>
          ))
        }

        <Button onClick={addSeries}
                variant='outlined'
                color='success'
        >
          Додати
        </Button>
      </Stack>
    </Paper>
  );
}

export default CreateVideoSeriesList;
