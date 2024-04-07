import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import {TitlesSite} from 'const/titles-site';
import {videoCategories, VideoCategory} from 'const/video-category';
import RenderVideo from 'components/RenderVideo/RenderVideo';

function SerialPage() {
  useEffect(() => {
    document.title = `${TitlesSite.main} ${videoCategories[VideoCategory.Serial]}`;
  }, []);
  return (
    <Container>
      <RenderVideo title={'Серіали'}
                   filter={{videoCategory: VideoCategory.Serial}}/>
    </Container>
  );
}

export default SerialPage;
