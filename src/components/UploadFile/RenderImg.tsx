import React from 'react';
import {Box, Skeleton, Stack, SxProps, Theme} from "@mui/material";

export interface RenderImgProps {
    sx?: SxProps<Theme>,
    srs?: string;
    children?: React.ReactNode
}

function RenderImg({sx, srs, children}: RenderImgProps) {
    return (
        <Box sx={sx} p={1}>
            {srs ?
                <img src={srs}
                     style={{width: '100%', height: '100%'}}
                     alt={'Icon'}/> :
                children ?
                    <Stack height='100%' justifyContent='center' alignItems='center'
                           sx={{background: 'rgba(0, 0, 0, 0.11)'}}>
                        {children}
                    </Stack>
                    :
                    <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
            }
        </Box>
    );
}

export default RenderImg;
