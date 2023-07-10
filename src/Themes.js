import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { Container } from '@mui/system';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const AnimatedContainer = styled(Container)`
  background: linear-gradient(45deg, #7f7fd5, #86a8e7, #91eae4);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
`;

const { palette } = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: 'Caprasimo, sans-serif',
    fontSize: 20,
  },

  palette: {
    primary: {
      main: '#e7eaf6',
    },
    secondary: {
      main: '#137083',
    },
    warning: {
      main: '#137083',
      contrastText: 'white',
    },
    error: {
      main: '#137083',
    },
    info: {
      main: '#79c2d0',
      contrastText: 'white',
    },
  },
});

export default theme;
