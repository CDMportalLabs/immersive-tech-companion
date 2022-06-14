import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { TextField, Button, Grid } from "@mui/material";
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { bookSession, checkAvailabilities } from "../../lib/booking-service";
import moment from 'moment';

export default function Home() {
    const router = useRouter();

    const [groupSize, setGroupSize] = useState(3);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [duration, setDuration] = useState(60);
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        checkAvailabilities(date, groupSize, duration)
            .then((resp) => {
                console.log(resp);
                const availableTimes = resp.times ? Object.values(resp.times) : [];
                setAvailabilities(availableTimes);
            })
        return;
    }, [])

    const handleSearchAvabilities = () => {
        try {
            checkAvailabilities(date, groupSize, duration)
                .then((resp) => {
                    console.log(resp);
                    const availableTimes = resp.times ? Object.values(resp.times) : [];
                    setAvailabilities(availableTimes);
                })
            // .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    const handleBooking = async (time) => {
        // Use router query data to transfer booking details to confirmation page
        await bookSession(date, groupSize, duration, time)
        router.push({
            pathname: "/booking/success",
            query: {
                date: date,
                time: time,
                duration: duration,
                groupSize: groupSize
            }
        });
    }

    return (
        <div>
            <Head>
                <title>Immersive Tech Companion App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Box
                    sx={{
                        display: "flex",
                        height: "100vh",
                        width: "100vw",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gridGap: 8,
                    }}>
                    {/* {loading && <h4>Loading...</h4>} */}
                    {/* <Auth /> */}
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            <TextField id="standard-basic" label="Group Size" variant="standard" defaultValue={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
                        </Grid>
                        <Grid item xs="auto">
                            <TextField id="standard-basic" label="Date" variant="standard" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
                        </Grid>
                        <Grid item xs="auto">
                            <TextField id="standard-basic" label="Duration" variant="standard" defaultValue={duration} onChange={(e) => setDuration(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button onClick={() => handleSearchAvabilities()}>Search Availabilities</Button>
                    <Box sx={{ marginTop: "64px" }}>
                        <h3>Time Slots:</h3>
                        <Box
                            sx={{
                                maxHeight: "320px",
                                overflowY: "auto",
                                width: "100px",
                            }}>
                            {availabilities.map((availability, idx) => (
                                <>
                                    <div key={idx}> {availability.value}</div>
                                    <Button onClick={() => handleBooking(availability.value)}>book</Button>
                                </>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </main>
        </div>
    )
}
