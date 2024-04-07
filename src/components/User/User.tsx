import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import UserListViewService from "../../service/user-list-view.service";
import {useAuthStore} from 'store/useAuthStore';
import {ListView} from 'type';
import UserListView from "components/UserListView/UserListView";

function User() {

  const {user} = useAuthStore();
  const [userList, setUserList] = useState<ListView[]>([]);

  useEffect(() => {

    if (user)
      UserListViewService
        .getUserListWithVideo()
        .then(date => {
          setUserList(date);
          console.log('UserListView', date);
        })
        .catch(reason => {
          console.log('UserListViewError', reason)
        });
  }, []);

  if (!user) {
    return <></>
  }

  return (
    <Paper elevation={2}>
      <Box p={2}>
        <Typography>Вітаю, {user.nickname}</Typography>
        <UserListView userList={userList}/>
      </Box>
    </Paper>
  );
}

export default User;
