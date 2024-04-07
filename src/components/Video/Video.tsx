import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Divider, Paper, Skeleton, Stack, Typography} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Carousel from "react-material-ui-carousel";
import {VideoDetail} from 'type';
import UserListViewButton from 'components/UserListViewButton/UserListViewButton';
import VideoInfo from 'components/VideoInfo/VideoInfo';
import VideoBanner from 'components/RenderImg/VideoBanner';
import {BreakBlock2} from 'components/BreakBlock';
import Comments from 'components/Comments/Comments';
import RenderSeries from 'components/RenderSeries/RenderSeries';
import {useAuthStore} from 'store/useAuthStore';
import {Roles} from 'helper/roles';
import {Links} from 'helper/link';


export interface VideoProps {
  id: number;
  videoDetail: VideoDetail;
  videoSeries?: boolean;
}

function Video({id, videoDetail}: VideoProps) {
  const typeLink = videoDetail.video.videoCategory;
  console.log('Video:', 'link', typeLink);
  const [video] = useState<VideoDetail>(videoDetail);
  const [value, setValue] = React.useState('1');

  const [view, setView] = useState<string>('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeView = (event: React.SyntheticEvent, newValue: string) => {
    setView(newValue);
  };

  const {user, token, getOut} = useAuthStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    if (!user)
      return;

    const admin = user.roles.includes(Roles.ADMIN);
    setIsAdmin(admin);
  }, []);

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
          {
            isAdmin && <Button  href={`/${typeLink}/${id}/update`} variant="outlined">
              Admin panel
            </Button>
          }
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

          <TabContext value={view}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <TabList onChange={handleChangeView} aria-label="lab API tabs example">
                <Tab label="Кадри" value="1"/>
                <Tab label="Трейлери" value="2"/>
              </TabList>
            </Box>

            <Stack sx={{
              height: {
                xs: 230,
                sm: 500,
                md: 600
              }
            }}>
              <TabPanel sx={{padding: 1}} value="1">
                {
                  video.videoInfo.pictures && video.videoInfo.pictures.length > 0 ?
                    <Carousel
                      fullHeightHover
                      animation={"slide"}
                      duration={800}
                      indicators={false}
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
                    :
                    null
                }
              </TabPanel>
              <TabPanel sx={{padding: 1, flexGrow: 1}} value="2">
                {
                  video.videoInfo.trailers && video.videoInfo.trailers.length > 0 ?
                    <Carousel
                      fullHeightHover
                      animation={"slide"}
                      duration={800}
                      navButtonsAlwaysVisible={false}
                      autoPlay={false}
                    >
                      {video.videoInfo.trailers.map((value) =>
                        <Box key={value} sx={{
                          height: {xs: 230, sm: 500, md: 600},
                        }}>
                          <iframe width="100%" height="100%"
                                  src={value}
                                  title="YouTube video player" frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                        </Box>
                      )}
                    </Carousel>
                    :
                    <Typography variant='h3' textAlign='center'>
                      Список трейлерів пустий
                    </Typography>

                }
              </TabPanel>
            </Stack>

          </TabContext>
          <BreakBlock2/>
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
