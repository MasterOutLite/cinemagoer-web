import React from 'react';
import {Box, IconButton, Link, Skeleton, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserListViewService from "../../service/user-list-view.service";
import {VideoFromListView} from 'type';

export interface UserListViewTabContentProps {
  video: VideoFromListView[],
  userListViewId: number,
  remove: (videoId: number, newList: VideoFromListView[]) => void;
}

function UserListViewTabContent({video, userListViewId, remove}: UserListViewTabContentProps) {
  const [listVideo, setListVideo] = React.useState<VideoFromListView[]>(video || []);

  function handleRemoveVideo(videoId: number, userListViewId: number) {
    return () => {
      UserListViewService.removeVideoToUserListView(userListViewId, videoId)
        .then(value => {
          console.log("remove");
          const newList = listVideo.filter(value => value.video.id !== videoId);
          remove(videoId, newList);
          setListVideo(newList);
        })
        .catch(reason => {

        });
    }
  }

  return (
    <Stack gap={2}>
      {
        listVideo.map(value =>
          <Stack key={value.id} direction={'row'} gap={1} alignContent={'center'}>
            <Box width={80} height={80}>
              {value.video.icon ?
                <img src={value.video.icon} alt={value.video.icon || 'Image'}
                     width={'100%'} height={'100%'}
                     style={{borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 50%'}}
                /> :
                <Skeleton variant="circular" width={'100%'} height={'100%'}/>
              }
            </Box>
            <Stack justifyContent={'center'} flexGrow={1}>
              <Link
                href={`/${value.video.videoCategory}/${value.video.id}`}
                underline={'none'} color="inherit">
                <Typography variant={'h6'}>{value.video.name[0]}</Typography>
                <Typography variant={'subtitle2'}>{value.video.name[1]}</Typography>
              </Link>
            </Stack>

            <IconButton aria-label="delete" size={"large"}
                        onClick={handleRemoveVideo(value.video.id, userListViewId)}
                        sx={{flexShrink: 0, alignSelf: 'center'}}>
              <DeleteIcon fontSize={"large"}/>
            </IconButton>
          </Stack>
        )
      }
    </Stack>
  );
}

export default UserListViewTabContent;
