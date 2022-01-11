import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#3864FF',
      main: '#3864FF',
      dark: '#FFFF',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.79)',
      light: 'rgba(255, 255, 255, 0.79)',
      dark: 'rgba(255, 255, 255, 0.79)',
      contrastText: '#293247',
    },
    text: {
      primary: '#3864FF',
    },
  },
});

export default theme;
