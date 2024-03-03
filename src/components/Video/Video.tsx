import React, {useState} from 'react';
import {Box, Button, Container, Divider, Paper, Skeleton, Stack, TextField, Typography} from "@mui/material";
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

  console.log(typeLink);

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
              <VideoBanner icon={video.video.icon}/>

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
                <Typography variant={'h4'}>Кадри</Typography>
                <Stack direction={'row'} height={'150px'}
                       gap={1} mt={2}>
                  {video.videoInfo.pictures.map((value, index) => {
                    if (index < 3)
                      return (
                        <Box key={index} width={250} height={150}>
                          <img height={'100%'} width={'100%'}
                               src={value}
                               alt={''}/>
                        </Box>
                      )
                  })}
                </Stack>
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
                <Tab label="Рецензії" value="2"/>
              </TabList>
            </Box>

            <TabPanel value="1">
              <Comments videoId={video.video.id}/>
            </TabPanel>

            <TabPanel value="2">
              <TextField margin={'normal'} fullWidth multiline size={'small'}/>
              <Button variant="contained">Опублікувати</Button>

              <Box mt={2}>
                <Divider sx={{marginY: {xs: '16px'}}} orientation="horizontal"
                         variant="fullWidth"/>
                <Typography variant={'h5'}>Рецензії</Typography>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </Container>
  );
}

export default Video;
