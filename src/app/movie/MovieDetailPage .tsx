import React, {useEffect, useState} from 'react';
import VideoService from "../../service/video.service";
import Video from "../../components/Video/Video";
import {useParams} from "react-router-dom";
import {VideoDetail} from "../../type/video-detail";
import {Container, Skeleton} from "@mui/material";

function MovieDetailPage() {
  const params = useParams() as { id: string };
  const id = parseInt(params.id);
  console.log(params);

  const [videoDetail, setVideoDetail] = useState<VideoDetail>();

  useEffect(() => {
    const get = async () => {
      const videoDetail = await VideoService.getVideoDetails(id);
      setVideoDetail(videoDetail);
    }
    get();
  }, []);

  if (!videoDetail)
    return (
      <Container>
        <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
      </Container>
    )

  return (<Video id={id} videoDetail={videoDetail}/>)
}

export default MovieDetailPage;
