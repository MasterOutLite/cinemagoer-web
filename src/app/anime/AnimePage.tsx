import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import { TitlesSite } from 'const/titles-site';
import { videoCategories, VideoCategory } from 'const/video-category';
import RenderVideo from 'components/RenderVideo/RenderVideo';


function AnimePage() {

  useEffect(() => {
    document.title = `${TitlesSite.main} ${videoCategories[VideoCategory.Anime]}`;
  }, []);

  return (
    <Container>
      <RenderVideo title={'Аніме'}
                   filter={{videoCategory: VideoCategory.Anime}}/>
    </Container>
  );
}

export default AnimePage;
