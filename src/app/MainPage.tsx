import {Box, Container, Grid, Paper, Skeleton} from "@mui/material";
import React, {useEffect, useState} from "react";
import RenderSeriesDay from "../components/RenderSeriesDay/RenderSeriesDay";
import {VideoType} from "../type/videoType";
import PreviewVideoWithInfoCard from "../components/PreviewVideoWithInfoCard/PreviewVideoWithInfoCard";
import BreakBlock2 from "../components/BreakBlock/BreakBlock2";
import VideoService from "../service/video.service";
import {VideoCategory} from "../helper/api";
import {Series} from "../type/series";
import Title from "../components/Title/Title";
import {TitlesSite} from "../const/titles-site";


const seriesForDayOfWeek = [
  'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя',
]

export default function MainPage() {

  const [anime, setAnime] = useState<VideoType[]>();
  const [movie, setMovie] = useState<VideoType[]>();
  const [series, setSeries] = useState<[Series[]]>([[]]);


  useEffect(() => {
    const get = async () => {
      const anime = (await VideoService.getVideoByFilter({videoCategory: VideoCategory.Anime})).rows;
      const movie = (await VideoService.getVideoByFilter({videoCategory: VideoCategory.Movie})).rows;
      const series = await VideoService.getVideoByDayOfWeek();
      setAnime(anime);
      setMovie(movie);
      setSeries(series);
    }
    document.title = TitlesSite.main;
    get();
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
              movie ? movie.map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                  <PreviewVideoWithInfoCard   {...value}/>
                </Grid>) :
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={300}>
                  </Skeleton>
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
              anime ? anime.map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                  <PreviewVideoWithInfoCard  {...value}/>
                </Grid>) :
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={300}>
                  </Skeleton>
                </Grid>
            }
          </Grid>
        </Box>
      </Paper>
    </Container>

  );
}

