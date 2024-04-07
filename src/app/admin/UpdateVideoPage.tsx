import SelectCategories, {SaveCategories} from 'components/Create/CreateVideo/SelectCategories';
import {TitlesSite} from 'const/titles-site';
import {videoTypes} from 'const/video-type';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {VideoService} from 'service';
import {Series, VideoDetail, VideoInfoType, VideoType} from 'type';
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import LoadPicture from "../../components/UploadFile/LoadPicture";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EditFieldsArrState from "../../components/Create/EditField/EditFieldsArrState";
import UpdateVideoSeriesList from "../../components/Update/UpdateVideoSeriesList/UpdateVideoSeriesList";

export type StateFields<T> = {
  state: 'current' | 'delete' | 'create' | 'update',
  value: T
}

function UpdateVideoPage() {
  const params = useParams() as { id: string };
  const id = parseInt(params.id);
  console.log(params);
  const [videoDetail, setVideoDetail] = useState<VideoDetail>();
  const [video, setVideo] = useState<VideoType>();
  const [videoInfo, setVideoInfo] = useState<VideoInfoType>();

  useEffect(() => {
    VideoService.getVideoDetails(id)
      .then(value => {
        setVideoDetail(value);
        setVideo(value.video);
        setVideoInfo(value.videoInfo);
        init(value.video, value.videoInfo, value.series);
        const {type, name} = value.video;
        document.title = `${TitlesSite.main} ${videoTypes[type]} ${name[0]}`;
        console.log(value.video, value.videoInfo);
      })
      .catch(reason => {
        console.log("Error", reason);
      })
  }, []);


  function updateVideo() {
    if (!video)
      return;

    const form = new FormData();
    names.forEach(value => {
      if (value.state !== "current") {
        form.append('name', value.value)
      }
    });

    if (dateRelease)
      form.append('dateRelease', dateRelease.toString())
    if (icon)
      form.append('icon', icon, icon.name);

    VideoService.updateVideo(form, video.id)
      .then(value => {
        console.log(value)
      });
  }

  function init(video: VideoType, videoInfo: VideoInfoType, series?: Series[]) {
    if (!video || !videoInfo)
      return;

    setNames(video.name.map(value => ({state: "current", value})));
    setTrailers(videoInfo.trailers.map(value => ({state: "current", value})));
    setCategories({
      videoCategory: video.videoCategory,
      type: video.type,
      status: video.status,
      ageRatingId: video.ageRating.id,
      publisherId: video.publisher.id,
      genreIds: video.genre.map(value => value.id),
      seasonOfYear: video.seasonOfYear,
    });
    setDescription(videoInfo.description);
    setDateRelease(new Date(video.dateRelease));
    setMainCharacter(videoInfo.mainCharacters.map(value => ({state: "current", value})));
    setDuration(videoInfo.duration);
    setCount(videoInfo.countSeries || 0);
    if (series) {
      const set: StateFields<Series>[] = series.map(value => ({
        state: 'current',
        value: {
          ...value
        }
      }));
      setSeries(set);
    }
  }

  const [names, setNames] = React.useState<StateFields<string>[]>([]);
  const [trailers, setTrailers] = React.useState<StateFields<string>[]>([]);
  const [categories, setCategories] = useState<SaveCategories>();
  const [icon, setIcon] = useState<File | null>();
  const [pictures, setPictures] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');
  const [dateRelease, setDateRelease] = useState<Date>(new Date());
  const [mainCharacter, setMainCharacter] = useState<StateFields<string>[]>([]);
  const [series, setSeries] = useState<StateFields<Series>[]>([]);

  const [duration, setDuration] = useState<string>('')
  const [count, setCount] = useState<number>(0);

  function handleChangeDateRelease(value: any) {
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    console.log('dateRelease', date);
    setDateRelease(date);
  }

  if (!video)
    return null;

  return (
    <Stack spacing={2}>
      <Button onClick={updateVideo}>Update</Button>
      <Stack sx={{flexDirection: {xs: 'column', md: 'row'}}}>
        <LoadPicture setLoadFile={setIcon}/>
        <Stack spacing={2} flexGrow={1}>
          <EditFieldsArrState minFields={1} init={names} setValue={setNames} label={'Назви'}/>
          <SelectCategories
            init={categories}
            savaChange={setCategories}/>
          <DatePicker value={dayjs(dateRelease)}
                      onChange={handleChangeDateRelease}
          />
          <TextField onChange={event => setDuration(event.target.value)}
                     value={duration}
                     fullWidth size={'small'} id="duration"
                     label="Тривалість" variant="outlined"/>
          <TextField onChange={event => setCount(parseInt(event.target.value))}
                     value={count}
                     fullWidth type='number' size={'small'} id="duration" label="Кількість серій" variant="outlined"/>

          <EditFieldsArrState minFields={1} init={mainCharacter} setValue={setMainCharacter} label={'Головні герої'}/>
        </Stack>
      </Stack>

      <TextField rows={12} margin='normal'
                 value={description}
                 onChange={event => setDescription(event.target.value)}
                 multiline size={'small'} id="description" label="Опис відео" variant="outlined"/>
      <UpdateVideoSeriesList init={series}/>
      <Paper elevation={4}>
        <Stack direction='column' p={1} spacing={1}>
          <Typography variant='h6'>Трейлери</Typography>
          <EditFieldsArrState minFields={0} setValue={setTrailers} label={'Трейлери'}/>
        </Stack>
      </Paper>


    </Stack>
  );
}

export default UpdateVideoPage;
