import React, {useEffect} from 'react';
import {Box, Button, IconButton, styled} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {VisuallyHiddenInput} from './VisuallyHiddenInput';
import RenderImg from "./RenderImg";

function LoadPicture() {

    const [src, setSrc] = React.useState<string>('');
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setFile(file);
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
    }


    return (
        <Box sx={{position: 'relative'}}>
            <IconButton sx={{right: 5, top: 5, position: 'absolute'}} onClick={handleRemoveImg}>
                <RemoveCircleOutlineRoundedIcon/>
            </IconButton>
            <RenderImg sx={{
                height: {xs: '100%', sm: '340px'},
                width: {xs: '100%', sm: '250px'},
                maxWidth: '340px', maxHeight: '500px',
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
