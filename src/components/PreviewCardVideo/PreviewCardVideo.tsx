import React from 'react';
import {Box, Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {VideoType} from "../../type/videoType";
import {videoTypes} from "../../const/video-type";
import {videoStatus} from "../../const/video-status";


export interface BigVideoProps extends VideoType {
}


function PreviewCardVideo({id, name, type, ageRating, rate, icon, dateRelease, status, videoCategory,}: BigVideoProps) {
  const data = new Date(dateRelease);
  return (

    <Paper style={{height: '100%'}} sx={{width: {xs: '250px', sm: '180px'}, paddingBottom: '6px'}}>

      < Stack style={{height: '100%'}}>
        <Box sx={{height: {xs: '340px', sm: '250px'}}} mb={1}>
          {icon ?
            <img src={icon}
                 style={{width: '100%', height: '100%'}}
                 alt={'Icon'}/>
            :

            <Skeleton variant="rectangular" height={'100%'}/>
          }
        </Box>
        <Link href={`/${videoCategory}/${id}`} underline={'none'} color="inherit">
          <Typography textAlign={'center'} m={'auto'} variant={'h6'} justifyItems={'center'}>
            {name[0]}
          </Typography>
        </Link>
        <Typography textAlign={'center'} variant={'subtitle2'} mt={'auto'}>
          {videoTypes[type]}
          | {data.getFullYear().toString()} |
          {videoStatus[status]}
        </Typography>
      </Stack>

    </Paper>

  );
}

export default PreviewCardVideo;
