import React from 'react';
import {Box, Button, IconButton, Paper, Stack} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {VisuallyHiddenInput} from './VisuallyHiddenInput';
import RenderImg from "./RenderImg";
import Grid2 from "@mui/material/Unstable_Grid2";

export type LoadFile = {
  name: string;
  src: string;
  file: File | null
}

export interface LoadArrPicturesProps {
  setLoadFile?: (file: File[]) => void;
  initPictures?: string [];
  eventRemove?: (file: LoadFile) => void;
}

function LoadArrPictures({setLoadFile, initPictures, eventRemove}: LoadArrPicturesProps) {
  const init = initPictures?.map(value => ({name: value, src: value, file: null}))
  const [files, setFiles] = React.useState<LoadFile[]>(init || []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        const url = event.target.result;
        const newFiles = [...files, {name: file.name, src: url, file: file}]
        setFiles((f) => [...newFiles])
        if (setLoadFile)
          setLoadFile([...newFiles.map(value => value.file)]);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleRemoveImg(name: string) {
    return () => {
      const newFiles = files.filter(value => value.name !== name)
      const removeFile = files.find(value => value.name == name);
      if (eventRemove && removeFile)
        eventRemove(removeFile)
      setFiles((f) => newFiles);

      if (setLoadFile) {
        const files = newFiles.map(value => value.file)
          .filter(value => value != null);
        // @ts-ignore
        setLoadFile(files);
      }
    }
  }

  return (
    <Grid2 container direction='row' flexWrap='wrap' spacing={2}>
      {
        files.map(value => (
          <Grid2 key={value.name} xs={12} sm={6} md={4} lg={3} xl={2} display='flex'>
            <Paper sx={{position: 'relative', width: '100%'}} elevation={2}>
              <Box>
                <IconButton sx={{right: 5, top: 5, position: 'absolute'}}
                            onClick={handleRemoveImg(value.name)}>
                  <RemoveCircleOutlineRoundedIcon color={'error'}/>
                </IconButton>
                <RenderImg sx={{
                  height: {xs: 400, sm: 300, md: 250},

                }} srs={value.src}>
                </RenderImg>
              </Box>
            </Paper>
          </Grid2>
        ))
      }

      <Grid2 xs={12} sm={6} md={4} lg={3} xl={2}>
        <RenderImg sx={{
          height: {xs: 400, sm: 300, md: 250},
          width: '100%',
        }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon/>}
          >
            Upload file
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange}/>
          </Button>
        </RenderImg>
      </Grid2>
    </Grid2>
  );
}

export default LoadArrPictures;
