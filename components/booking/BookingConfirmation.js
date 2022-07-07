import { Box } from '@mui/system';
import { css } from "@emotion/react"
import qrCodeImage from "../../lib/assets/qr_code.png";
import ticketBackground from "../../lib/assets/ticket_bg.png";
import ticketBackground2 from "../../lib/assets/ticket2_bg.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Avatar, Grid } from "@mui/material";
import moment from 'moment';

const BookingConfirmation = ({ date, time, game, location }) => {
	return (
		<Box>
			<Box >
				<Box sx={{ background: `url(${ticketBackground.src})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll", height: "55vh", borderRadius: "40px" }}></Box>
				<Grid container direction="row" justifyContent="center" alignItems="center" sx={{ background: `url(${ticketBackground2.src})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll", paddingTop: "0" }}>
					<Grid container item direction="column" alignItems="flex-end" xs={6} md={6} sx={{ marginRight: "2rem" }}>
						<Grid item xs="auto">
							<h1 style={{marginTop: "0", fontSize: "34px"}}>{game}</h1>
						</Grid>
						{/* <Grid container item xs="auto" direction="row" alignItems="center" sx={{ margin: "0 auto auto auto" }}>
							<Grid item xs="auto">
								<Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
									<LocationOnIcon />
								</Avatar>
							</Grid>
							<Grid item xs="auto">
								<span>{location}</span>
							</Grid>
						</Grid> */}
						<Grid item xs="auto" sx={{marginTop: "0"}}>
							<span style={{color: "white", display: "inline", fontSize: "12px"}}>{time} | {moment(date).format("MMM Do YYYY")}</span>
						</Grid>
						<Grid item xs="auto" sx={{marginTop: "0"}}>
							<span style={{color: "white", display: "inline", fontSize: "12px"}}>{location}</span>
						</Grid>
						{/* <Grid container item xs="auto" direction="row" alignItems="center" sx={{ margin: "0 auto auto auto" }}>
							<Grid item xs="auto">
								<Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
									<AccessAlarmIcon />
								</Avatar>
							</Grid>
							<Grid item xs="auto">
								<span>{date}, {time}</span>
							</Grid>
						</Grid> */}
					</Grid>
					<Grid container item xs={4} md={4} direction="column" justifyContent="center" alignItems="flex-start">
						<Grid item xs="auto">
							<img width="80%" src={qrCodeImage.src} style={{margin: "0", paddingTop: "2rem"}}></img>
						</Grid>
						<Grid item xs="auto">
							<p style={{margin: "0", paddingBottom: "2rem", color: "white", fontSize: "9px"}}>For session details and customization</p>
						</Grid>
					</Grid>
				</Grid>
				{/* <Box height="5vh"></Box> */}
			</Box>
			<Box sx={{ margin: "auto 1rem", textAlign: "center" }}>
				<h3>Thank you for booking!</h3>
				<p>Above is your ticket and go ahead share it with your friends. A confirmation email will be sent to yolandahe528@gmail.com soon. </p>
			</Box>
		</Box>
	)

}

export default BookingConfirmation;