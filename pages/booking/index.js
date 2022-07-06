import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import moment from 'moment';

import LocationPage from "../../components/booking/location/LocationPage";
import GamePage from "../../components/booking/game/GamePage";
import CalendarPage from "../../components/booking/calendar/CalendarPage";

export default function NewBookingPage() {
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
