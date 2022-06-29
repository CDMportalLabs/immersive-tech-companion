import '../styles/globals.css'
import '../styles/booking.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../lib/helpers/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
