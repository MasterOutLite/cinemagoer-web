import React, {useEffect, useMemo, useState} from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import CreateVideoSeries from "./CreateVideoSeries";
import {v4 as uuidv4} from 'uuid';
import {CreateSeries} from 'type';
import {StateFields} from 'app/admin/UpdateVideoPage';

export interface CreateVideoSeriesListStateProps {
  minFieldsLength?: number
  save: (series: StateFields<CreateSeries>[]) => void;
  init?: StateFields<CreateSeries>[];
}

type Series = CreateSeries & {
  uuid: string;
}

function CreateVideoSeriesListState({minFieldsLength, save, init}: CreateVideoSeriesListStateProps) {

  const [series, setSeries] = useState<StateFields<Series>[]>([]);
  const render = useMemo(() => {
    return series.filter(value => value.state !== 'delete');
  }, [series])

  useEffect(() => {
    if (init) {
      const res: StateFields<Series>[] = init.map(value => ({
        state: value.state,
        value: {...value.value, uuid: uuidv4()}
      }))
      console.log('Init video series', res, init);
      setSeries(res);
    }

  }, []);

  function addSeries() {
    let lastSeries = series.reverse().find(value => value.state != 'delete');

    if (!lastSeries) {
      lastSeries = {
        state: "create",
        value: {series: 0, name: '', dayOfWeek: 1, dateRelease: new Date(), release: false, uuid: uuidv4()}
      };
    } else {
      lastSeries = {
        value: {...lastSeries.value, uuid: uuidv4(), series: lastSeries.value.series + 1},
        state: lastSeries.state
      }
    }
    console.log("Add last", lastSeries)

    // @ts-ignore
    setSeries(prevState => [...prevState, lastSeries])
  }

  function handleRemove(uuid: string) {
    return () => {
      const minLength = minFieldsLength || 0;
      if (series.length <= minLength)
        return;

      series.forEach(value => {
        if (value.value.uuid === uuid) {
          value.state = 'delete';
          return;
        }
      });

      console.log("remove", uuid);

      setSeries(prevState => [...series]);
      saveSeries(series);
    }
  }

  function handleSave(uuid: string) {
    return (updateSeries: CreateSeries) => {
      const index = series.findIndex(value => value.value.uuid === uuid);
      const updatedSeries = [...series];
      const state = updatedSeries[index].state == 'current' || updatedSeries[index].state == 'update' ? 'update' : 'create';
      updatedSeries[index] = {...updatedSeries[index], ...updateSeries, state};
      const sortedSeries = updatedSeries.sort((a, b) => a.value.series - b.value.series);
      setSeries(sortedSeries);
      saveSeries(sortedSeries);
      console.log("Save series", sortedSeries);
    }
  }

  function saveSeries(series: StateFields<Series>[]) {

    const saveCreateSeries: StateFields<CreateSeries>[] = series.map(value =>
      ({...value}));
    save(saveCreateSeries);
  }


  return (
    <Paper elevation={4}>
      <Stack spacing={1} p={1}>
        <Typography variant='h6'>Сірії</Typography>
        {
          render.map(value => (
            <CreateVideoSeries key={value.value.uuid} series={value.value}
                               remove={handleRemove(value.value.uuid)}
                               save={handleSave(value.value.uuid)}/>
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

export default CreateVideoSeriesListState;
