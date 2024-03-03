import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {BasePath, getBaseRequest, VideoCategory} from "../../helper/api";
import RenderVideo from "../../components/RenderVideo/RenderVideo";
import {BaseResponse} from "../../type/base-response";

function SerialPage() {
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
      <RenderVideo title={'Серіали'}
                   filter={{genre, ageRating, videoCategory: VideoCategory.Serial}}/>
    </Container>
  );
}

export default SerialPage;
