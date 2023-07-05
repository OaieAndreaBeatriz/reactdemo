import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: 'Caprasimo, sans-serif',
    fontSize: 20,
  },

  palette: {
    primary: {
      main: '#ff9a3c',
    },
    secondary: {
      main: '#ff6f3c',
    },
    warning: {
      main: '#ffcab0',
      contrastText: 'white',
    },
    error: {
      main: '#ffc93c',
    },
    info: {
      main: '#fae3d9',
      contrastText: 'white',
    },
  },
});

export default theme;
