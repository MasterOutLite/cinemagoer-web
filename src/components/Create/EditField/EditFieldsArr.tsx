import React, {useEffect} from 'react';
import {Box, Button, Stack} from "@mui/material";
import EditField from "./EditField";
import {v4 as uuidv4} from 'uuid';

export interface EditFieldsArrProps {
  setValue: (arr: string[]) => void;
  label: string;
  placeholder?: string;
  init?: string[];
  minFields?: number;
}

type Field = { value: string, id: number | string }

function EditFieldsArr({setValue, label, init, placeholder, minFields}: EditFieldsArrProps) {
  const [values, setValues] =
    React.useState<Field[]>([]);

  useEffect(() => {
    let initList: Field[] = [];
    if (init) {
      initList = init.map((value, index) =>
        ({id: uuidv4(), value})) as Field[];
    }

    if (minFields && initList.length < minFields) {
      const count = minFields - initList.length;
      for (let i = 0; i < count; i++) {
        initList.push({id: uuidv4(), value: ''});
      }
    }

    setValues(initList);
  }, []);


  function handleChangeField(id: number | string, value: string) {
    values.forEach(name => {
      if (name.id === id)
        name.value = value;
    });
    const returnValue = values.map(value => value.value);
    setValue(returnValue);
    console.log('EditFieldsArr', 'update values')
    setValues(values);
  }

  function handleRemoveField(id: number | string) {
    const min = minFields ? minFields : 1;
    if (values.length <= min)
      return;
    const newNames = values.filter(name => name.id != id);
    setValues(newNames);
  }

  function addFields() {
    setValues([...values, {id: uuidv4(), value: 'none'}])
  }

  useEffect(() => {
    const returnValue = values.map(value => value.value);
    setValue(returnValue);
    //console.log('EditFieldsArr', 'update values', values);
  }, [values]);

  return (
    <Stack spacing={2}>
      {
        values.map((value) => (
          <EditField key={value.id}
                     init={value.value} id={value.id}
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

export default EditFieldsArr;
