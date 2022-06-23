import { Box, Card, CardContent, CardMedia, Typography, useTheme, Grid } from '@mui/material';
import { css } from "@emotion/react";

export default function GameCard(props) {
	const styles = {
		root: css`
            margin: 2rem auto;
            width: 90%;
            display: flex;
          `,
		card: css`
            margin: auto 1rem;
            width: 20rem;
            height: 30rem;
						border: 1px solid #e0e0e0;
        `
		,
		imageCard: css`
            margin: auto 1rem;
            width: 14rem;
            height: 20rem;
            background-color: gray;
						padding: 2rem;
        `,
        
		grid: css`
            margin: auto;
        `
	}
	
	return (
		<Box sx={styles.root}>
			<Card sx={styles.card}>
					<Grid container spacing={{ xs: 4, md: 2 }} direction = 'column' justifyContent="center" alignItems="center" padding="1rem">
					 <Grid item>
					 <Box sx={styles.imageCard}>Image placeholder</Box>
					 <Grid item container spacing={{ xs: 3, md: 2 }}  justifyContent="center" alignItems="center">
					 	<Grid item xs="auto">
						 <h2 style={{fontSize: "12px", margin: "0"}}>{props.title}</h2>
						 </Grid>
						<Grid item xs="auto">
								<box style={{ fontSize: "10px", margin: "0" }}>{props.numOfPlayers} players | {props.duration} mins</box>
						 </Grid>
						<Grid item xs="auto">
								<p style={{ fontSize: "10px", margin: "2" }}>Deep signal introduction</p>
						 </Grid>

					 
					 </Grid>
					 </Grid>
					</Grid>
			</Card>
		</Box>
	)
	
	
}