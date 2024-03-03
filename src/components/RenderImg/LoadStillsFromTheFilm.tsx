import React from 'react';
import {Box, Button, IconButton, Stack} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {VisuallyHiddenInput} from './VisuallyHiddenInput';
import RenderImg from "./RenderImg";

export type LoadFile = {
    name: string;
    src: string;
    file: any
}

function LoadStillsFromTheFilm() {
    const [files, setFiles] = React.useState<LoadFile[]>([]);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event: any) {
                const url = event.target.result;
                setFiles((f) => [...f, {name: file.name, src: url, file: file}])
            };
            reader.readAsDataURL(file);
        }
    };

    function handleRemoveImg(name: string) {
        return () => {
            setFiles((f) => f.filter(value => value.name !== name));
        }
    }

    return (
        <Stack direction='row' flexWrap='wrap'>
            {
                files.map(value => (
                    <Box key={value.name} sx={{position: 'relative', maxWidth: 320}}>
                        <IconButton sx={{right: 5, top: 5, position: 'absolute'}}
                                    onClick={handleRemoveImg(value.name)}>
                            <RemoveCircleOutlineRoundedIcon/>
                        </IconButton>
                        <RenderImg sx={{
                            height: {xs: '100%', sm: 250},
                            width: {xs: '100%', sm: 340},
                            maxWidth: 320, maxHeight: 250,
                        }} srs={value.src}>
                        </RenderImg>
                    </Box>
                ))
            }

            <RenderImg sx={{
                height: {xs: '100%', sm: 250},
                width: {xs: '100%', sm: 340},
                maxWidth: 320, maxHeight: 250,
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
        </Stack>
    );
}

export default LoadStillsFromTheFilm;
