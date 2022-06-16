import { Box } from '@mui/system';
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import Cookies from 'js-cookie';
import bookSession from '../../lib/services/booking-service';
import { css } from "@emotion/react"

const BookingContactForm = ({ date, time, duration, groupSize }) => {
    return (
        <div>
            <h2>Deep Signal</h2>
            <p>Please review your booking info here: {date} {time} with {groupSize} people for {duration} minutes.</p>
        </div>
    )

}

export default BookingContactForm;