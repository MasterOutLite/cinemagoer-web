import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {BasePath, getBaseRequest, VideoCategory} from "../../helper/api";
import VideoService from "../../service/video.service";
import RenderVideo from "../../components/RenderVideo/RenderVideo";
import {BaseResponse} from "../../type/base-response";
import {VideoType} from "../../type/videoType";


function CartonListPage() {
  const [ageRating, setAgeRating] = useState<BaseResponse[]>([]);
  const [genre, setGenre] = useState<BaseResponse[]>([]);

  useEffect(() => {
    const get = async () => {
      const ageRating = await getBaseRequest(BasePath.ageRating);
      setAgeRating(ageRating);
      const genre = await getBaseRequest(BasePath.genre);
      setGenre(genre);
    }
    get();
  }, []);

  return (

    <Container>
      <RenderVideo  title={'Мультфільми'}
                   filter={{genre, ageRating, videoCategory: VideoCategory.Cartoon}}/>
    </Container>

  );
}

export default CartonListPage;
