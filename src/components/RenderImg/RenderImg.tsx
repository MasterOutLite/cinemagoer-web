import React, {memo} from 'react';
import {Box, CircularProgress, Stack, SxProps, Theme} from "@mui/material";

export interface RenderImgProps {
  sx?: SxProps<Theme>,
  src?: string;
  alt?: string;
  children?: React.ReactNode
}

function RenderImg({sx, src, children, alt}: RenderImgProps) {
  return (
    <Box sx={sx} p={1}>
      {src ?
        <img src={src}
             style={{width: '100%', height: '100%'}}
             alt={alt || 'None'}/> :
        children ?
          <Stack height='100%' justifyContent='center' alignItems='center'
                 sx={{background: 'rgba(0, 0, 0, 0.11)'}}>
            {children}
          </Stack>
          :
          <Stack direction='row' height='100%' justifyContent='center' alignItems='center'>
            <CircularProgress/>
          </Stack>
      }
    </Box>
  );
}

export default memo(RenderImg);
