import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
  },
  components: {
    MuiPaper:{
      defaultProps:{},
      styleOverrides: {
        root: {
          overflow: 'auto',
          '*::-webkit-scrollbar': {
            width: '0.4em'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '0.1em solid rgba(0,0,0,.3)',
            borderRadius: 5
          },
        }
      }
    },
    MuiAppBar: {
      defaultProps:{
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c'
        }
      }
    }
  },

});