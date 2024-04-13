import {Box, CircularProgress, Container, Grid, Paper, Skeleton, Stack} from "@mui/material";
import {TitlesSite} from "const/titles-site";
import React, {useEffect, useState} from "react";
import {Series} from "type/series";
import RenderSeriesDay from "components/RenderSeriesDay/RenderSeriesDay";
import Title from "components/Title/Title";
import PreviewVideoWithInfoCard from "components/PreviewVideoWithInfoCard/PreviewVideoWithInfoCard";
import {BreakBlock2} from "components/BreakBlock";
import {VideoType} from "type/videoType";
import VideoService from "service/video.service";
import {VideoCategory} from "const/video-category";


export default function MainPage() {
  const [anime, setAnime] = useState<VideoType[]>();
  const [movie, setMovie] = useState<VideoType[]>();
  const [series, setSeries] = useState<[Series[]]>([[]]);
  const maxItemRender = 8;

  useEffect(() => {
    document.title = TitlesSite.main;

    VideoService.getVideoByFilter({videoCategory: VideoCategory.Anime}).then(value => {
      setAnime(value.rows);
    });

    VideoService.getVideoByFilter({videoCategory: VideoCategory.Movie}).then(value => {
      setMovie(value.rows);
    });

    VideoService.getVideoByDayOfWeek().then(value => {
      setSeries(value);
    });
  }, []);

  return (
    <Container>
      <RenderSeriesDay series={series}/>

      <Box p={2}></Box>

      <Paper elevation={3}>
        <Box>
          <Title sxTitle={{textAlign: 'center'}}>
            Фільми
          </Title>
          <Grid container spacing={2} p={1}>
            {
              movie ? movie.slice(0, maxItemRender).map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                  <PreviewVideoWithInfoCard   {...value}/>
                </Grid>) :
                <Grid item xs={12}>
                  <Stack direction='row' height={300} alignItems='center' justifyContent='center'>
                    <CircularProgress/>
                  </Stack>
                </Grid>
            }
          </Grid>
          <BreakBlock2/>
        </Box>

        <Box>
          <Title sxTitle={{textAlign: 'center'}}>
            Аніме
          </Title>
          <Grid container spacing={2} p={1}>
            {
              anime ? anime.slice(0, maxItemRender).map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                  <PreviewVideoWithInfoCard  {...value}/>
                </Grid>) :
                <Grid item xs={12}>
                  <Stack direction='row' height={300} alignItems='center' justifyContent='center'>
                    <CircularProgress/>
                  </Stack>
                </Grid>
            }
          </Grid>
        </Box>
      </Paper>
    </Container>

  );
}

