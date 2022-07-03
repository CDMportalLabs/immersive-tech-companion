import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { checkAvailabilities } from "../../../lib/services/booking-service";
import moment from 'moment';

const CalendarPage = ({ date, dateStr, time, setDate, setDateStr, setTime, setGame, setCurrState, handleBooking }) => {
    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        timeButton: css`
            background-color: #FFFFFF;
            color: black;
        `,

        timeSelectionButton: css`
            margin: 2rem auto;
            width: 20rem;
            height: 3rem;
        `
    }
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
                            setDate(moment().format('YYYY-MM-DD'));
                            setGame('');
                            setCurrState('game');
                            router.push({ query: {} });
                        }}
                    >
                        <ChevronLeftIcon /></IconButton>
                    <h3 style={{ fontSize: "30px", margin: "0", marginRight: "5rem" }}>Choose a session</h3>
                </Grid>
                <Grid item xs='auto'>
                    <h5 style={{ fontSize: "20px", margin: "0.5rem 2rem" }}>Select a date</h5>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            date={date}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                            onChange={(newValue) => {
                                console.log('newValue is:', newValue);
                                console.log('old value is:', date);
                                setDate(newValue);
                                setDateStr(moment(newValue).format('YYYY-MM-DD'));
                                console.log(date);
                            }}
                        />
                        {timeVisible && availabilities.length > 0 &&
                            <Grid item container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                <Grid item xs="auto">
                                    <h5 style={{ fontSize: "20px", margin: "0.5rem 0" }}>Select a 30 min session</h5>
                                    <Box style={{ fontSize: "15px" }}>Please arrive 20 mins early to avoid delays</Box>
                                </Grid>
                                <Grid item container spacing={2} alignItems="center" margin="auto 1rem">
                                    {availabilities.map((availability, idx) => (
                                        <Grid item xs="auto">
                                            <>
                                                <Button
                                                    sx={styles.timeButton}
                                                    variant="contained"
                                                    onClick={() => { setTime(availability.value) }}>{availability.value}</Button>
                                            </>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        }
                    </LocalizationProvider>
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