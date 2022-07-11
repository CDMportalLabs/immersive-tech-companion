import { Box } from '@mui/system';
import { css } from "@emotion/react"
import qrCodeImage from "../../lib/assets/qr_code.png";
import ticketBackground from "../../lib/assets/ticket_bg.png";
import ticketBackground2 from "../../lib/assets/ticket2_bg.png";
import { Grid } from "@mui/material";
import moment from 'moment';

const BookingConfirmation = ({ date, time, game, location, duration, email }) => {
	const styles = {
		ticketCard: css`
			background: url(${ticketBackground.src});
			background-repeat: no-repeat;
			background-position: center;
			background-attachment: scroll;
			height: 55vh;
			border-radius: 40px;
		`,
		gameTitleText: css`
			margin-top: 0;
			font-size: 34px;
		`,
		bookingInfoText: css`
			color: white;
			display: inline;
			font-size: 12px;
		`,
		qrCodeImage: css`
			margin: auto;
			padding: 2rem 1rem 0 1rem;
		`,
		scanText: css`
			margin: 0;
			padding: 0 1rem 2rem 1rem;
			color: white;
			font-size: 9px;
			width: 80%;
		`,
		bottomTextDiv: css`
			margin: auto 1rem;
			text-align: center;
		`
	}

	return (
		<Box>
			<Box >
				<Box sx={styles.ticketCard}></Box>
				<Grid container direction="row" justifyContent="center" alignItems="center" sx={{ background: `url(${ticketBackground2.src})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll", paddingTop: "0" }}>
					<Grid container item direction="column" alignItems="flex-end" xs={6} md={6} sx={{ marginRight: "2rem" }}>
						<Grid item xs="auto">
							<h1 style={styles.gameTitleText}>{game}</h1>
						</Grid>
						<Grid item xs="auto" sx={{marginTop: "0"}}>
							<Box component="span" sx={styles.bookingInfoText}>{time}-{moment(time, 'HH:mm').add(duration, 'm').format("HH:mm")} | {moment(date).format("MMM Do YYYY")}</Box>
						</Grid>
						<Grid item xs="auto" sx={{marginTop: "0"}}>
							<Box component="span" sx={styles.bookingInfoText}>{location}</Box>
						</Grid>
					</Grid>
					<Grid container item xs={4} md={4} direction="column" justifyContent="center" alignItems="flex-start">
						<Grid item xs="auto">
							<Box component="img" width="80%" src={qrCodeImage.src} sx={styles.qrCodeImage}></Box>
						</Grid>
						<Grid item xs="auto">
							<Box component="p" sx={styles.scanText}>Scan to join the session</Box>
						</Grid>
					</Grid>
				</Grid>
			</Box>
			<Box sx={styles.bottomTextDiv}>
				<h3>Thank you for booking!</h3>
				<p>Above is your ticket and go ahead share it with your friends. A confirmation email will be sent {email ? "to "+email : ""} soon. </p>
			</Box>
		</Box>
	)

}

export default BookingConfirmation;