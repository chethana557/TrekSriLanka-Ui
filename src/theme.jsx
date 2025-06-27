import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    // Override all typography variants to use the system font
    h1: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    h2: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    h3: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    h4: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    h5: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    h6: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    body1: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    body2: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    subtitle1: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    subtitle2: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    button: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    overline: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
  },
  components: {
    // Override Material-UI components to use system fonts
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
        '*': {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
  },
});

export default theme;