import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { checkAvailabilities } from "../../../lib/services/booking-service";
import moment from 'moment';
import { useRouter } from 'next/router';
import Calendar from "./Calendar";

const CalendarPage = ({ date, dateStr, time, setDate, setDateStr, setTime, setGame, setCurrState, handleBooking }) => {
    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        timeSelectionButton: css`
            margin: 2rem auto;
            width: 20rem;
            height: 3rem;
        `
    }
    const router = useRouter();
    const groupSize = 3;
    const duration = 15;
    const [timeVisible, setTimeVisible] = useState(false);
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(async () => {
        const resp = await checkAvailabilities(dateStr, groupSize, duration);
        const availableTimes = resp.times ? Object.values(resp.times) : [];
        setAvailabilities(availableTimes);
        setTimeVisible(true);
        return;
    }, [dateStr]);

    return (
        <Box sx={styles.root}>
            <Grid container
                spacing={2}
                direction='column'
                justifyContent="center"
                alignItems="center"
                margin="2rem auto 0 auto">
                <Grid item container direction='row' xs='auto'>
                    <IconButton
                        onClick={() => {
                            setDate(new Date());
                            setDateStr(moment().format('YYYY-MM-DD'));
                            setGame('');
                            setCurrState('game');
                            router.push({ query: {} });
                        }}
                    >
                        <ChevronLeftIcon /></IconButton>
                    <h1 style={{ fontSize: "30px", margin: "0", marginRight: "5rem", color: "black" }}>Choose a session</h1>
                </Grid>
                <Grid item xs='auto'>
                    <h5 style={{ fontSize: "20px", margin: "0.5rem 2rem" }}>Select a date</h5>
                        <Calendar
                        date={date}
                        timeVisible={timeVisible}
                        availabilities={availabilities}
                        setDate={setDate}
                        setDateStr={setDateStr}
                        setTime={setTime}
                        />
                </Grid>
            </Grid>
            <Box style={{ "textAlign": "center" }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setCurrState('calendar');
                        handleBooking(time);
                    }}
                    disabled={time == ''}
                    sx={styles.timeSelectionButton}>Select this session
                </Button>
            </Box>
        </Box>
    )
}

export default CalendarPage;