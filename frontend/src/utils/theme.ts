import { createTheme } from '@mui/material/styles';

const mainColor = '#C7212F';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#a6a6a6',
      contrastText: '#00000099',
    },
    secondary: {
      light: '#4dabf5',
      main: mainColor,
      dark: '#1769aa',
      contrastText: '#ffffff',
    },
    error: {
      main: '#b3001b',
    },
  },
  typography: {
    fontWeightMedium: 400,
    h5: {
      fontWeightMedium: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '99px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled .MuiInput-input': {
            cursor: 'not-allowed',
          },
        },
        underline: {
          '&:after': {
            borderBottom: '2px solid',
            borderBottomColor: mainColor,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid',
            borderBottomColor: mainColor,
          },
          '&.Mui-disabled:before': {
            borderBottomStyle: 'solid',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            cursor: 'not-allowed',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: mainColor,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontSize: '0.8rem',
        },
      },
    },
  },
});

export default theme;
