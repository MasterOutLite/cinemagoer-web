import React, {memo, useCallback, useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface EditFieldProps {
  init?: string;
  id: number | string;
  remove: (id: number | string) => void;
  label: string;
  placeholder?: string;
  change: (id: number | string, value: string) => void;
}

function EditField({remove, change, id, init, placeholder, label}: EditFieldProps) {
  const [value, setValue] = useState<string>(init || '');
  const [oldValue, setOldValue] = useState<string>(init || '');

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setValue(newValue);
  }

  const handleBlur = () => {
    if (value != oldValue) {
      change(id, value)
      setOldValue(value);
    }
  };

  const handleRemove = useCallback(() => {
    remove(id);
  }, [id, remove])

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <TextField id="edit-field"
                 fullWidth
                 value={value}
                 size={'small'}
                 onChange={handleChangeValue}
                 placeholder={placeholder}
                 onBlur={handleBlur}
                 label={label} variant="outlined"/>

      <Button variant='outlined' onClick={handleRemove}>
        <DeleteIcon/>
      </Button>
    </Stack>
  );
}

export default memo(EditField);
