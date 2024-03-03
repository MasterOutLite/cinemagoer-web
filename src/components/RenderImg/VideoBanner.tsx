import React from 'react';
import {Box, Skeleton, Stack} from "@mui/material";

export interface VideoBannerProps {
  icon?: string,
  srs?: string;
  children?: React.ReactNode
}

function VideoBanner({icon, children, srs}: VideoBannerProps) {

  return (
    <Box sx={{
      height: {xs: '100%', sm: '340px'},
      width: {xs: '100%', sm: '250px'},
      maxWidth: '340px', maxHeight: '500px',
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

export default VideoBanner;
