import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { IconButton, Button, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import moment from 'moment';
import { css } from "@emotion/react"

import LocationPage from "../../components/booking/location/LocationPage";
import GamePage from "../../components/booking/game/GamePage";
import CalendarPage from "../../components/booking/calendar/CalendarPage";

export default function NewBookingPage() {

    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        grid: css`
            margin: 2rem auto 0 auto;
          `,
        cardButton: css`
            width: 30rem;
            height: 10rem;
        `,
        gameButton: css`
            margin: 6rem 2rem 0 auto;
            display: block;
            textAlign: center;
            color: white;
            width: 20rem;
            height: 5rem;
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

    const router = useRouter()

    const groupSize = 3;
    const duration = 15;

    const [dateStr, setDateStr] = useState(moment().format('YYYY-MM-DD'));
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [game, setGame] = useState('');
    const [time, setTime] = useState('');
    const [currState, setCurrState] = useState('location');

    const handleBooking = () => {
        // Use router query data to transfer booking details to confirmation page
        router.push({
            pathname: "/booking/info",
            query: {
                date: dateStr,
                time: time,
                duration: duration,
                groupSize: groupSize,
                location: location,
                game: game
            }
        });
    }

    switch (currState) {
        case ('location'):
            return (
                <LocationPage
                location={location}
                setLocation={setLocation}
                setCurrState={setCurrState}
                />
            )
        case ('game'):
            return (
                <GamePage
                game={game}
                setGame={setGame}
                setLocation={setLocation}
                setCurrState={setCurrState}
                />
            )
        case ('calendar'):
            return (
                <CalendarPage
                date={date}
                dateStr={dateStr}
                time={time}
                setDate={setDate}
                setDateStr={setDateStr}
                setTime={setTime}
                setGame={setGame}
                setCurrState={setCurrState}
                handleBooking={handleBooking}
                />
            )
    }
}
