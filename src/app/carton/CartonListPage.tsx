import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import { TitlesSite } from 'const/titles-site';
import { videoCategories, VideoCategory } from 'const/video-category';
import RenderVideo from 'components/RenderVideo/RenderVideo';


function CartonListPage() {
  useEffect(() => {

    document.title = `${TitlesSite.main} ${videoCategories[VideoCategory.Cartoon]}`;
  }, []);

  return (

    <Container>
      <RenderVideo title={'Мультфільми'}
                   filter={{videoCategory: VideoCategory.Cartoon}}/>
    </Container>

  );
}

export default CartonListPage;
