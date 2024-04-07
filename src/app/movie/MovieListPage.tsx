import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import { TitlesSite } from 'const/titles-site';
import { videoCategories, VideoCategory } from 'const/video-category';
import RenderVideo from 'components/RenderVideo/RenderVideo';

function MovieListPage() {

  useEffect(() => {
    document.title = `${TitlesSite.main} ${videoCategories[VideoCategory.Movie]}`;
  }, []);

  return (
    <Container>
      <RenderVideo title={'Фільми'}
                   filter={{videoCategory: VideoCategory.Movie}}/>
    </Container>
  );
}

export default MovieListPage;
