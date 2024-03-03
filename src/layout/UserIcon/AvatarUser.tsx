import React from 'react';
import {Button} from "@mui/material";
import {useAuthStore} from "../../store/useAuthStore";

function AvatarUser() {
  const {user} = useAuthStore();

  return (
    <Button variant={'contained'} href={'/user'}>{user ? 'Профіль' : 'Увійти'}</Button>
  );
}

export default AvatarUser;
