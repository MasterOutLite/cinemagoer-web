import React from 'react';
import {Box, Skeleton, Stack} from "@mui/material";

export interface RenderStillsFromTheFilmProps {
  icon?: string,
  srs?: string;
  children?: React.ReactNode
}

function RenderStillsFromTheFilm({srs, icon, children}: RenderStillsFromTheFilmProps) {
  return (
    <Box sx={{
      height: {xs: 340, sm: '100%'},
      width: {xs: 250, sm: '100%'},
      minHeight: 150,
      maxWidth: 350, maxHeight: 340,
    }} p={1}>
      {icon || srs ?
        <img src={srs ? srs : icon}
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

export default RenderStillsFromTheFilm;
