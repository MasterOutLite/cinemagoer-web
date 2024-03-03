import React, {useState} from 'react';
import {Box, Container, Divider, Paper, Skeleton, Stack, Typography} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {VideoDetail} from "../../type/video-detail";
import VideoBanner from "../RenderImg/VideoBanner";
import UserListViewButton from "../UserListViewButton/UserListViewButton";
import VideoInfo from "../VideoInfo/VideoInfo";
import RenderSeries from "../RenderSeries/RenderSeries";
import Comments from "../Comments/Comments";
import Carousel from "react-material-ui-carousel";
import Title from "../Title/Title";
import {BreakBlock, BreakBlock2} from "../BreakBlock";


export interface VideoProps {
  id: number;
  videoDetail: VideoDetail;
  videoSeries?: boolean;
}

function Video({id, videoDetail}: VideoProps) {
  const typeLink = videoDetail.video.videoCategory; //getTypeLink(videoDetail.video.videoCategory);
  console.log('Video:', 'link', typeLink);
  const [video] = useState<VideoDetail>(videoDetail);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!videoDetail)
    return (
      <Container>
        <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
      </Container>
    )

  return (
    <Container>
      <Paper>
        <Box p={1}>
          <Stack direction={{xs: 'column', sm: 'row'}}>
            <Stack alignItems={'center'}>
              {
                video.video.icon ? <VideoBanner icon={video.video.icon}/> :
                  <Skeleton>
                    <VideoBanner icon={video.video.icon}/>
                  </Skeleton>
              }

              <UserListViewButton videoId={id}/>

              <Divider sx={{width: '100%', mt: '6px'}} orientation="horizontal" variant="fullWidth"/>
            </Stack>
            <VideoInfo typeLink={typeLink} {...video}/>
          </Stack>

          <Typography p={1}>
            {video.videoInfo.description}
          </Typography>

          <RenderSeries series={video.series}/>

          {
            video.videoInfo.pictures && video.videoInfo.pictures.length > 0 ?
              <Box>
                <Title sxTitle={{textAlign: 'center'}} sx={{marginBottom: 1}}>
                  Кадри
                </Title>
                <Carousel
                  fullHeightHover
                  animation={"slide"}
                  duration={800}
                >
                  {video.videoInfo.pictures.map((value) =>
                    <Box key={value} sx={{
                      height: {xs: 230, sm: 500, md: 600},
                    }}>
                      <img height={'100%'} width={'100%'}
                           src={value}
                           alt={''}/>

                    </Box>
                  )}
                </Carousel>
                <BreakBlock2/>
              </Box>
              :
              null
          }
        </Box>

        <Box sx={{width: '100%', typography: 'body1'}}>
          <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Коментарі" value="1"/>
              </TabList>
            </Box>

            <TabPanel sx={{padding: 1}} value="1">
              <Comments videoId={video.video.id}/>
            </TabPanel>

          </TabContext>
        </Box>
      </Paper>
    </Container>
  );
}

export default Video;
