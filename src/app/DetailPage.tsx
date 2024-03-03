import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {VideoDetail} from "../type/video-detail";
import VideoService from "../service/video.service";
import {CircularProgress, Container, Skeleton} from "@mui/material";
import Video from "../components/Video/Video";
import {TitleSite} from "../const/titleSite";
import {videoTypes} from "../const/video-type";

function DetailPage() {
  const params = useParams() as { id: string };
  const id = parseInt(params.id);
  console.log(params);

  const [videoDetail, setVideoDetail] = useState<VideoDetail>();

  useEffect(() => {
    const get = async () => {
      const videoDetail = await VideoService.getVideoDetails(id);
      setVideoDetail(videoDetail);
      const {type, name} = videoDetail.video;
      document.title = `${TitleSite.main} ${videoTypes[type]} ${name[0]}`;
    }
    get();
  }, []);

  if (!videoDetail)
    return (
      <Container sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <CircularProgress sx={{margin: '0 auto'}}/>
        <Skeleton sx={{flexGrow: 1}} variant="rectangular" width={'100%'}>
          <div></div>
        </Skeleton>
      </Container>
    )

  return (<Video id={id} videoDetail={videoDetail}/>)
}

export default DetailPage;
