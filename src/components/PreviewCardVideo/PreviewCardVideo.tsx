import React from 'react';
import {Box, Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import { VideoType } from 'type';
import { videoStatus } from 'const/video-status';
import { videoTypes } from 'const/video-type';


export interface BigVideoProps extends VideoType {
}


function PreviewCardVideo({id, name, type, ageRating, rate, icon, dateRelease, status, videoCategory,}: BigVideoProps) {
  const data = new Date(dateRelease);
  return (

    <Paper sx={{width: 200, height: '100%', paddingBottom: '6px'}} elevation={4}>
      <Link href={`/${videoCategory}/${id}`} underline={'none'} color="inherit" sx={{height: '100%'}}>
        <Stack sx={{height: '100%'}}>

          <Box sx={{height: 260}} mb={1}>
            {icon ?
              <img src={icon}
                   style={{width: '100%', height: '100%'}}
                   alt={'Icon'}/>
              :
              <Skeleton variant="rectangular" height={'100%'}/>
            }
          </Box>

          <Typography textAlign={'center'} variant={'h6'} justifyItems={'center'}>
            {name[0]}
          </Typography>

          <Typography textAlign={'center'} variant={'subtitle2'} mt={'auto'}>
            {videoTypes[type]} | {data.getFullYear().toString()} | {videoStatus[status]}
          </Typography>

        </Stack>
      </Link>
    </Paper>

  );
}

export default PreviewCardVideo;
