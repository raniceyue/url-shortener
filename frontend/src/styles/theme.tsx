import { createTheme, Theme } from '@material-ui/core/styles'

const theme: Theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'serif',
    ].join(','),
  },
  spacing: 8
});

export default theme