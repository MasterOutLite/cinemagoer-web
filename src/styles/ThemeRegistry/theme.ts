import {createTheme} from '@mui/material/styles';
import {pink} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: pink,
    secondary: pink,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ownerState}) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
