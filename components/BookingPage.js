import { Box } from '@mui/system';
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import Cookies from 'js-cookie';
import bookSession from '../lib/booking-service';
import { css } from "@emotion/react"

const BookingConfirmation = () => {
	const date = Cookies.get('date');
	const time = Cookies.get('time');
	const duration = Cookies.get('duration');
	const groupSize = Cookies.get('groupSize');
	const experienceId = Cookies.get('experienceId');
	console.log('About to book session')
	const resp = bookSession(date, groupSize, duration, time, "Booking test - Dhruv", experienceId);
	// if resp is not undefined and error not in response, then we have a successful booking
	if (!('errorCode' in resp)) {
		return (
			<div>
				<h1>Booking successful</h1>
				<p>You have successfully booked a session with the following details: {date} {time}</p>
			</div>)
} else {
	return (
		<div>
				<h1>Booking failed</h1>
		</div>
	)
	}
	
}

export default BookingConfirmation;