import { Box } from '@mui/system';
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import Cookies from 'js-cookie';
import bookSession from '../../lib/services/booking-service';
import { css } from "@emotion/react"

const BookingConfirmation = ({ date, time }) => {
	return (
		<div>
			<h1>Booking successful</h1>
			<p>You have successfully booked a session with the following details: {date} {time}</p>
		</div>
	)

}

export default BookingConfirmation;