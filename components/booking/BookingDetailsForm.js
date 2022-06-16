import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid } from "@mui/material";
import { css } from "@emotion/react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const BookingDetailsForm = (props) => {
    const styles = {
        root: css`
            margin: 2rem auto;
            width: 80%;
            display: flex;
            justifyContent: center;
            alignItems: center
          `,
        imageCard: css`
            margin: auto 1rem;
            width: 15rem;
            height: 10rem;
            background-color: gray;
        `,
        bookingDetails: css`
            margin: auto;
        `
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.imageCard}>Image placeholder</Box>
            <Grid container spacing={{ xs: 1, md: 2 }} direction="column" justifyContent="center" alignItems="flex-start" sx={styles.bookingDetails}>
                <Grid container item xs="auto">
                    <h3 style={{margin: "0"}}>Deep Signal</h3>
                </Grid>
                <Grid container item xs="auto" direction="row" alignItems="center">
                    <Grid item xs="auto">
                    <Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
                        <LocalAtmIcon />
                    </Avatar>
                    </Grid>
                    <Grid item xs="auto">
                        <span>$135</span>
                    </Grid>
                </Grid>
                <Grid container item xs="auto" direction="row" alignItems="center">
                    <Grid item xs="auto">
                    <Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
                        <LocationOnIcon />
                    </Avatar>
                    </Grid>
                    <Grid item xs="auto">
                    <span>Vancouver</span>
                    </Grid>
                </Grid>
                <Grid container item xs="auto" direction="row" alignItems="center">
                <Grid item xs="auto">
                <Avatar sx={{ color: "gray", bgcolor: "transparent" }}>
                        <AccessAlarmIcon />
                    </Avatar>
                    </Grid>
                    <Grid item xs="auto">
                        <span>{props.date}</span>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BookingDetailsForm;