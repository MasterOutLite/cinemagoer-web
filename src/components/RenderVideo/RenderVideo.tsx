import React, {memo, useEffect, useMemo, useState} from 'react';
import {Box, Button, Paper, Stack, SwipeableDrawer, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Title from "../Title/Title";
import Filter from "../Filter/Filter";
import {VideoCategory} from 'const/video-category';
import {VideoType} from 'type/videoType';
import {FilterVideo} from 'service/video.service';
import {VideoService} from 'service';
import PreviewCardVideo from 'components/PreviewCardVideo/PreviewCardVideo';


export interface RenderVideoProps {
  filter: {
    videoCategory: VideoCategory;
  };
  title: string;
}

function RenderVideo({filter, title}: RenderVideoProps) {
  const [video, setVideo] = React.useState<VideoType[]>([]);
  const [query, setQuery] = React.useState<FilterVideo>({});
  const [search, setSearch] = React.useState<string>('');
  const [searchCount, setSearchCount] = React.useState<number>(0);

  const [state, setState] = React.useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState(open);
      };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setSearch(() => value)
  }

  const handleSendSearch = async () => {
    if (!search) {
      setSearchCount((v) => v + 1);
    } else {
      setSearchCount(() => 0);
    }

    if (searchCount > 1)
      return;
    //add memo
    let data;
    if (search.length > 0) {
      data = await VideoService.getVideoByName(search as string, filter.videoCategory);
    } else {
      data = await VideoService.getVideoByFilter({videoCategory: filter.videoCategory, page: 0});
    }
    setVideo(data.rows);
  }

  const changeQuery = useMemo(() => query, [query]);
  const [oldQuery, setOldQuery] = useState<FilterVideo>();

  useEffect(() => {
    const request = async () => {
      query.videoCategory = filter.videoCategory;
      const data = await VideoService.getVideoByFilter(query);
      setVideo(data.rows);
      return data;
    }
    if (query && JSON.stringify(query) !== JSON.stringify(oldQuery)) {
      setOldQuery(query);
      request().then();
    }

  }, [changeQuery])

  return (
    <Stack direction={'row'} spacing={2} alignItems={'flex-start'} justifyContent={'center'}>

      <Stack spacing={2} flexGrow={1}>
        <Stack direction={'row'} spacing={2} flexGrow={1} alignItems={'center'}>

          <Paper style={{flexGrow: 1}}>
            <Stack direction={'row'}>
              <TextField id='search-video-by-name' onKeyDown={event => {
                if (event.code === 'Enter') {
                  handleSendSearch();
                }
              }} fullWidth value={search} onChange={handleSearch}/>
              <Button onClick={handleSendSearch}><SearchRoundedIcon fontSize={'large'}/></Button>
            </Stack>
          </Paper>
          <Box sx={{display: {xs: 'black', lg: 'nones'}}}>
            <Button variant="contained" size={'large'}
                    onClick={toggleDrawer(true)}><FilterAltRoundedIcon/></Button>
            <SwipeableDrawer
              anchor={'right'}
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <Filter setQuery={setQuery}
                      videoCategory={filter.videoCategory}/>
            </SwipeableDrawer>
          </Box>
        </Stack>

        <Paper style={{flexGrow: 1}}>
          <Title>
            {title}
          </Title>

          <Grid2 container spacing={1} rowSpacing={2} py={4} justifyContent={'space-evenly'}
          >
            {
              video.map(value => (
                <Grid2 key={value.id}>
                  <PreviewCardVideo key={value.id}  {...value}/>
                </Grid2>
              ))
            }
          </Grid2>
        </Paper>
      </Stack>

      {/*<Filter sx={{display: {xs: 'none', lg: 'block'}, minWidth: '250px', flexGrow: 1}} setQuery={setQuery}*/}
      {/*        videoCategory={filter.videoCategory}/>*/}


    </Stack>
  );
}

export default memo(RenderVideo);
