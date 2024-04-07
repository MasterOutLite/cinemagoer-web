import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Stack} from "@mui/material";
import {useAuthStore} from 'store/useAuthStore';
import User from 'components/User/User';
import {Links} from 'helper/link';
import Auth from 'components/Auth/Auth';
import {Roles} from "../../helper/roles";

function UserPage() {
  const {user, token, getOut} = useAuthStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  console.log('Token', token);

  function handleSignOut() {
    getOut();
  }

  useEffect(() => {
    if (!user)
      return;

    const admin = user.roles.includes(Roles.ADMIN);
    setIsAdmin(admin);
  }, []);

  if (!user)
    return (
      <Container sx={{minHeight: '100%'}}>
        <Box py={6}>
          <Auth/>
        </Box>
      </Container>
    )

  return (
    <Container>
      <Stack gap={2}>
        <Box alignSelf='flex-end'>
          {
            isAdmin && <Button href={Links.admin} variant="outlined">
              Admin panel
            </Button>
          }

          <Button variant="outlined" sx={{marginLeft: 2}}
                  onClick={handleSignOut}>Sign Out</Button>
        </Box>
        <User/>
      </Stack>
    </Container>
  );
}

export default UserPage;
