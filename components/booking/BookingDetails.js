import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid } from "@mui/material";
import { css } from "@emotion/react";
import bgImage from '../../lib/assets/confirmation_bg.png';

const BookingDetails = ({ location, game, date }) => {
    const styles = {
        root: css`
            background-image: url(${bgImage.src});
            background-repeat: no-repeat;
            background-position: center;
            background-attachment: scroll;
            background-size: cover;
            height: 45vh;
          `,
        bookingInfoGrid: css`
            padding: 0 0 1rem auto;
        `,
        gameTitleText: css`
            color: white;
            font-weight: 700;
            font-family: Titillium Web;
            font-size: 30px;
        `,
        bookingDetailsText: css`
            color: white;
            font-weight: 400;
            font-family: Roboto;
            font-size: 13px;
        `
    }

    return (
        <Box sx={styles.root}>
            {/* <Box sx={{ height: "40vh" }}></Box> */}
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{paddingTop: "30vh", paddingBottom: "auto"}}>
                <Grid item xs="auto" sx={{margin: "0 auto 0 2.5rem"}}>
                    <Box component="h1" sx={styles.gameTitleText}>{game}</Box>
                </Grid>
                <Grid item xs="auto" sx={{margin: "0 auto 0.5rem 2.5rem"}}>
                    <Box component="span" sx={styles.bookingDetailsText}>$88/session | {location} | {date}</Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BookingDetails;