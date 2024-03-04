import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Edit this file for custom theme
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1b6bbd',
          light: '#268fff29'
        },
        secondary: {
          main: '#ff532c'
        }
      }
    },
    dark: {
      palette: {}
    }
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: '100%'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontWeight: 600
        })
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          '&+.MuiDialogContent-root': {
            paddingTop: '20px !important'
          },
          fontWeight: 600,
          borderBottom: '0.5px solid var(--border-primary)'
        }
      }
    }
  }
})

export default theme
