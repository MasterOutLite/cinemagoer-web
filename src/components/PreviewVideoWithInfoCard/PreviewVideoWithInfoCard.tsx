import React from 'react';
import {Box, Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {yellow} from "@mui/material/colors";
import {VideoType} from 'type';
import {videoTypes} from 'const/video-type';
import {FilterParam} from 'type/filter-param';
import RenderImg from "../RenderImg/RenderImg";


export interface PreviewVideoWithInfoCardProps extends VideoType {

}

function PreviewVideoWithInfoCard({
                                    id,
                                    name,
                                    type,
                                    ageRating,
                                    dateRelease,
                                    genre,
                                    icon,
                                    rate,
                                    videoCategory,
                                  }: PreviewVideoWithInfoCardProps) {
  return (
    <Paper style={{padding: '4px', background: '#e6d2be1a'}}>
      <Stack flexDirection={'row'} gap={1}>
        <Link href={`/${videoCategory}/${id}`} underline={'none'} color="inherit">
          <RenderImg sx={{width: {xs: 150, sm: 184}, height: {xs: 220, sm: 260}}} srs={icon}/>
        </Link>
        <Stack>
          <Link href={`/${videoCategory}/${id}`} underline={'none'} color="inherit">
            <Typography variant={'h6'} component={'h2'}>
              {name[0]}
            </Typography>
            <Typography variant={'subtitle2'}>
              {name[1]}
            </Typography>
          </Link>
          {
            <Stack flexDirection={'row'} gap={1}>
              <StarRoundedIcon sx={{color: yellow[800], fontSize: 30}}/>
              <Paper sx={{background: yellow[700], paddingX: '4px', minWidth: '50px'}}>
                <Typography variant={'h6'} textAlign={'center'}
                            color={'#fff'}> {rate || '0.00'}</Typography>
              </Paper>
            </Stack>
          }

          <Typography>
            {new Date(dateRelease).getFullYear()} | {videoTypes[type]}
          </Typography>
          <Typography>
            Жанри:
            {genre.map((value, index, array) =>
              <React.Fragment key={value.id}>
                <Link underline="hover"
                      href={`${videoCategory}?${FilterParam.genre}=${value.id}`}> {value.name}</Link>
                {index !== array.length - 1 ? <span>, </span> : null}
              </React.Fragment>
            )}
          </Typography>
          <Typography>
            Віковий рейтинг: {ageRating.name}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default PreviewVideoWithInfoCard;
