import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {BasePath, getBaseRequest, VideoCategory} from "../../helper/api";
import RenderVideo from "../../components/RenderVideo/RenderVideo";
import VideoService from "../../service/video.service";
import {BaseResponse} from "../../type/base-response";
import {VideoType} from "../../type/videoType";
import {TitlesSite} from "../../const/titles-site";
import {videoCategories} from "../../const/video-category";


function AnimePage() {
  const [ageRating, setAgeRating] = useState<BaseResponse[]>([]);
  const [genre, setGenre] = useState<BaseResponse[]>([]);

  useEffect(() => {
    const get = async () => {
      const ageRating = await getBaseRequest(BasePath.ageRating);
      setAgeRating(ageRating);
      const genre = await getBaseRequest(BasePath.genre);
      setGenre(genre);
    }

    document.title = `${TitlesSite.main} ${videoCategories[VideoCategory.Anime]}`;
    get();
  }, []);

  return (
    <Container>
      <RenderVideo  title={'Аніме'}
                   filter={{genre, ageRating, videoCategory: VideoCategory.Anime}}/>
    </Container>
  );
}

export default AnimePage;
