import React, {useEffect, useMemo, useState} from 'react';
import {CreateSeries, Series} from 'type';
import {StateFields} from "../../../app/admin/UpdateVideoPage";
import {Paper, Stack, Typography} from "@mui/material";
import UpdateVideoSeries from './UpdateVideoSeries';
import {IdentitySeries} from 'type/identity-series';
import {v4 as uuidv4} from "uuid";
import CreateVideoSeriesList from "../../Create/CreateVideoSeries/CreateVideoSeriesList";

export interface UpdateVideoSeriesListProps {
  init?: StateFields<Series>[];
}

function UpdateVideoSeriesList({init}: UpdateVideoSeriesListProps) {
  const [series, setSeries] = useState<StateFields<IdentitySeries>[]>([]);
  const render = useMemo(() => {
    return series.filter(value => value.state !== 'delete');
  }, [series])

  const [createSeries, setCreateSeries] = useState<CreateSeries[]>([]);

  useEffect(() => {
    if (init) {
      const res: StateFields<IdentitySeries>[] = init.map(value => ({
        state: value.state,
        value: {...value.value, uuid: uuidv4(),}
      }))
      console.log('Init video series', res, init);
      setSeries(res);
    }

  }, []);

  function handleRemove(uuid: string) {
    return () => {
      const newSeries = series.filter(value => value.value.uuid !== uuid);
      setSeries(newSeries);
    }
  }

  return (
    <Paper elevation={4}>
      <Stack spacing={1} p={1}>
        <Typography variant='h6'>Сірії поточні</Typography>
        {
          render.map(value => (
            <UpdateVideoSeries key={value.value.uuid} series={value.value}
                               remove={handleRemove(value.value.uuid)}
            />
          ))
        }
        <CreateVideoSeriesList save={setCreateSeries}/>
      </Stack>
    </Paper>
  );
}

export default UpdateVideoSeriesList;
