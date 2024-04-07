import React, {memo, useEffect, useMemo, useState} from 'react';
import {Box, Button, Stack} from "@mui/material";
import EditField from "./EditField";
import {v4 as uuidv4} from 'uuid';
import {StateFields} from "../../../app/admin/UpdateVideoPage";

export interface EditFieldsArrStateProps {
  setValue: (arr: StateFields<string>[]) => void;
  label: string;
  placeholder?: string;
  init?: StateFields<string>[];
  minFields?: number;
}

type Field = { value: StateFields<string>, id: number | string }

function EditFieldsArrState({setValue, label, init, placeholder, minFields}: EditFieldsArrStateProps) {
  const [values, setValues] =
    React.useState<Field[]>([]);

  const render = useMemo(() => {
    const res = values.filter(value => value.value.state !== 'delete');
    console.log('Render memo', res);
    return res;
  }, [values])

  useEffect(() => {
    console.log('init', init);
    let initList: Field[] = [];
    if (init) {
      initList = init.map((value, index) =>
        ({id: uuidv4(), value})) as Field[];
    }
    setValues(initList);
  }, []);

  function handleChangeField(id: number | string, value: string) {
    values.forEach(name => {
      if (name.id === id) {
        name.value.value = value;
        if (name.value.state == 'current') {
          name.value.state = 'update'
        } else
          name.value.state = 'create'
      }
    });
    const returnValue = values.map(value => value.value);
    setValue(returnValue);
    console.log('EditFieldsArr', 'update values', value)
    setValues(prevState => [...values]);
  }

  function handleRemoveField(id: number | string) {
    const min = minFields ? minFields : 1;
    if (values.length <= min)
      return;
    const newNames = values.find(value => value.id == id);
    console.log(newNames);

    if (newNames)
      newNames.value.state = 'delete';
    setValues(prevState => [...prevState]);
  }

  function addFields() {
    setValues([...values, {id: uuidv4(), value: {value: '', state: 'create'}}])
  }

  useEffect(() => {
    const returnValue = values.map(value => value.value);
    setValue(returnValue);
    console.log('EditFieldsArr', 'update values', values);
  }, [values]);

  return (
    <Stack spacing={2}>
      {
        render.map((value) => (
          <EditField key={value.id}
                     init={value.value.value} id={value.id}
                     label={label}
                     placeholder={placeholder}
                     remove={handleRemoveField}
                     change={handleChangeField}/>
        ))
      }
      <Box alignSelf='center'>
        <Button variant='contained' color='success' onClick={addFields}>Додати</Button>
      </Box>
    </Stack>
  );
}

export default memo(EditFieldsArrState);
