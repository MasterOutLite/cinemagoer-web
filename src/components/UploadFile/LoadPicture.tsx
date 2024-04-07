import React from 'react';
import {Box, Button, IconButton} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {VisuallyHiddenInput} from './VisuallyHiddenInput';
import RenderImg from "./RenderImg";

export interface LoadPictureProps {
  setLoadFile?: (file: File | null) => void;
  initPicture?: string;
}

function LoadPicture({setLoadFile, initPicture}: LoadPictureProps) {

  const [src, setSrc] = React.useState<string>(initPicture || '');
  const [file, setFile] = React.useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    if (setLoadFile)
      setLoadFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        const url = event.target.result;
        setSrc(url);
      };

      reader.readAsDataURL(file);
    }
  };

  function handleRemoveImg() {
    setSrc('')
    setFile(null);
    if (setLoadFile)
      setLoadFile(null);
  }


  return (
    <Box sx={{
      position: 'relative',
      height: {xs: 340, sm: '340px'},
      width: {xs: '100%', sm: '250px'},
      maxWidth: 280, maxHeight: '500px',
    }}>
      <IconButton sx={{right: 5, top: 5, position: 'absolute'}} onClick={handleRemoveImg}>
        <RemoveCircleOutlineRoundedIcon color={'error'}/>
      </IconButton>
      <RenderImg sx={{
        height: {xs: '100%', sm: '340px'},
      }} srs={src}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon/>}
        >
          Upload file
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange}/>
        </Button>
      </RenderImg>
    </Box>
  );
}

export default LoadPicture;
