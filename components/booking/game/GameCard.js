import { Box, Card, CardContent, CardMedia, Typography, useTheme, Grid } from '@mui/material';
import { css } from "@emotion/react";

export default function GameCard(props) {
	const styles = {
		// Update this settings, need to be more precise
		imageCard: css`
						margin: 20px;
						height: 350px;
            background-color: gray;
        `,
		gameCard: css`
		 	margin: 0;
			height: 500px;
			width: 300px;
			box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
		`
	}

	return (
		<Card sx={styles.gameCard}>
			<Grid container spacing={2} direction='column' justifyContent="center" alignItems="center">
				<Grid item>
					<Box sx={styles.imageCard}>Image placeholder</Box>
					<Grid item container justifyContent="center" alignItems="center">
						<Grid item>
							<h2 style={{ fontSize: "12px", margin: "0" }}>{props.title}</h2>
						</Grid>
						<Grid item>
							<Box style={{ fontSize: "10px", marginLeft: "10px" }}>{props.numOfPlayers} players | {props.duration} mins</Box>
						</Grid>
						<Grid item>
							<p style={{ fontSize: "10px", margin: "2" }}>Deep signal introduction</p>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	)


}