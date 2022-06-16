import { Box } from '@mui/system';
import { css } from "@emotion/react"
import qrCodeImage from "../../lib/assets/qr_code.png";
import ticketBackground from "../../lib/assets/ticket_bg.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Avatar, Grid } from "@mui/material";

const BookingConfirmation = ({ date, time }) => {
	return (
		<Box>
			<Box sx={{ backgroundImage: `url(${ticketBackground.src})`, backgroundColor: "lightGray", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll" }}>
				<Box height="42vh"></Box>
				<Grid container direction="row" justifyContent="center" alignItems="space-between">
					<Grid container item direction="column" xs={8}>
						<Grid item xs="auto" sx={{ margin: "0 auto auto 5%" }}>
							<h1>Deep Signal</h1>
						</Grid>
						<Grid container item xs="auto" direction="row" alignItems="center" sx={{ margin: "0 auto auto 2%" }}>
							<Grid item xs="auto">
								<Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
									<LocationOnIcon />
								</Avatar>
							</Grid>
							<Grid item xs="auto">
								<span>Vancouver</span>
							</Grid>
						</Grid>
						<Grid container item xs="auto" direction="row" alignItems="center" sx={{ margin: "0 auto auto 2%" }}>
							<Grid item xs="auto">
								<Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
									<AccessAlarmIcon />
								</Avatar>
							</Grid>
							<Grid item xs="auto">
								<span>{date}, {time}</span>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item xs={4} direction="column" justifyContent="center" alignItems="flex-start">
						<Grid item xs="auto">
							<img width="120%" src={qrCodeImage.src}></img>
						</Grid>
						<Grid item xs="auto">
							<p style={{width: "80%", fontSize: "12px"}}>For session details and customization</p>
						</Grid>
					</Grid>
				</Grid>
				<Box height="5vh"></Box>
			</Box>
			<Box sx={{ margin: "auto 1rem" }}>
				<h3>Thank you for booking!</h3>
				<p>A confirmation email has been sent to your provided email.<br />Download your tickeet above and send it to the other players to get them prepared!</p>
			</Box>
		</Box>
	)

}

export default BookingConfirmation;