import React, {useState} from 'react';
import {Box, Button, Stack, TextField} from "@mui/material";
import {CategoriesService} from 'service';
import {usePublisherStore} from "../../../store/usePublisherStore";


function AddPublisher() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const {add} = usePublisherStore();
  const [state, setState] = useState<boolean>(false)

  function createPublisher() {

    if (!name || name.length < 4 || state)
      return;
    console.log('send create pub')
    setState(true);
    CategoriesService.createPublisher(name, description)
      .then(value => {
        console.log(value);
        add(value);
        setState(false);
      }).catch(reason => {
      setState(false);
    });
  }

  return (
    <Stack spacing={3}>
      <TextField value={name} onChange={event => setName(event.target.value)}
                 fullWidth placeholder='Назва'/>

      <TextField value={description} onChange={event => setDescription(event.target.value)}
                 multiline rows={4}
                 fullWidth placeholder='Опис'/>

      <Button sx={{ml: 'auto'}} variant='contained' onClick={createPublisher}>Додати</Button>
    </Stack>

  );
}

export default AddPublisher;
