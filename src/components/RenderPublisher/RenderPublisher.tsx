import React, {SyntheticEvent, useState} from 'react';
import {Autocomplete, Dialog, IconButton, Paper, Stack, TextField} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {usePublisherStore} from 'store/usePublisherStore';
import {BaseResponse} from 'type/base-response';
import AddPublisher from "../Create/AddPublisher/AddPublisher";

export interface RenderPublisherProps {
  setValue: (value: BaseResponse | null) => void;
  showAdd?: boolean;
  init?: BaseResponse | null;
}

function RenderPublisher({setValue, showAdd = true, init = null}: RenderPublisherProps) {
  const {publisher, getPublisher} = usePublisherStore();
  const [select, setSelect]
    = useState<BaseResponse | null>(init);

  const [open, setOpen] = useState(false);

  function handleChangePublisher(event: SyntheticEvent<Element, Event>, newValue: any) {
    setSelect(newValue);
    setValue(newValue)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction='row'>
      <Autocomplete
        id={`checkboxes-publisher`}
        size={'small'}
        value={select}
        fullWidth
        options={publisher}
        onChange={handleChangePublisher}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={'Видавець'} placeholder="Виберіть із списку"/>
        )}
      />

      {
        showAdd && <IconButton onClick={handleOpen}>
          <AddCircleOutlineIcon/>
        </IconButton>
      }

      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{width: {xs: 300, sm: 400}}}>
          <Stack>
            <IconButton onClick={handleClose} sx={{ml: 'auto'}}>
              <CloseRoundedIcon/>
            </IconButton>
          </Stack>
          <Stack p={2}>
            <AddPublisher/>
          </Stack>
        </Paper>
      </Dialog>
    </Stack>
  );
}

export default RenderPublisher;
