import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect} from 'react';
import {Links} from "../helper/link";
import AvatarUser from "./UserIcon/AvatarUser";
import {TitlesSite} from "../const/titles-site";
import {useAuthStore} from "../store/useAuthStore";

const drawerWidth = 240;
const navItems = [
  {title: 'Фільми', href: Links.movie},
  {title: 'Серіали', href: Links.serial},
  {title: 'Мультфільми', href: Links.carton},
  {title: 'Аніме', href: Links.anime}];

interface Props {
  window?: () => Window;
}

function Header(props: Props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {user, getOut} = useAuthStore();

  useEffect(() => {
    if (user) {
      const date = new Date(user.exp * 1000);
      if (date < new Date()) {
        console.log("Invalid token date", date);
        getOut();
      }
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Typography variant="h6" sx={{my: 2}}>
        {TitlesSite.main}
      </Typography>
      <Box sx={{background: '#000'}} height={4}/>
      <Stack divider={<Divider/>}>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton style={{textAlign: 'center'}}
                            href={item.href}
            >
              <ListItemText primary={item.title}/>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex', marginBottom: '12px'}}>
      <CssBaseline/>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: {xs: 'display', sm: 'block'},
              textAlign: {xs: 'center', sm: 'start'},
            }}
          >
            <Link href={'/'} color="inherit" underline="none">
              {TitlesSite.main}
            </Link>
          </Typography>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            {navItems.map((item) => (
              <Button key={item.href}
                      href={item.href}
                      color={'inherit'}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <AvatarUser/>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}

export default Header;
