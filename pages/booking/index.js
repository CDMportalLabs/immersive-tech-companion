import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { TextField, Button, Grid} from "@mui/material";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { bookSession, checkAvailabilities } from "../../lib/services/booking-service";
import moment from 'moment';
import { css } from "@emotion/react"
import LocationCard from "../../components/LocationCard";
import GameCard from "../../components/GameCard";
import Calendar from "../../components/Calendar";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';



export default function NewBookingPage() {
    
    const styles = {
        root: css`
            margin: 2rem auto 0 auto;
          `,
        grid: css`
            margin: 2rem auto 0 auto;
          `,
        bookingButton: css`
            margin: 0 auto;
            display: block;
            textAlign: center;
            color: white;
            background-color: gray;
        `
          
        
    }
    const router = useRouter()
    
    const [groupSize, setGroupSize] = useState(3);
    // const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [dateStr, setDateStr] = useState('');
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(60);
    const [availabilities, setAvailabilities] = useState([]);
    const [location, setLocation] = useState('');
    const [game, setGame] = useState('');
    const [currState, setCurrState] = useState('location');
    
    if (currState === 'location') {
        // TODO: Make a loop on a list of props to generate the cards
        return (
            <Box sx={styles.root}>
            <Grid container
                spacing={1}
                direction='column'
                justifyContent="center" 
                alignItems="center">
                <Grid item xs='auto'>
                    <h3 style={{fontSize: "40px", margin: "0"}}>Select a Location</h3>
                </Grid>
                <Grid item xs='auto'>
                    <Button 
                        onClick={() => {
                        setLocation('Vancouver')
                        }}> <LocationCard location='Vancouver'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={location === 'Vancouver'}/>
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button 
                        onClick={() => {
                        setLocation('Toronto')
                        }}> <LocationCard location='Toronto'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={false}/>
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button 
                        onClick={() => {
                        setLocation('New york')
                        }}> <LocationCard location='New york'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={false}/>
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                <Button
                    variant="contained"
                    onClick={() => {setCurrState('game')}}
                    disabled={location == ''}
                    sx={styles.bookingButton}>Select the location</Button>
                </Grid>
            </Grid>
            </Box>
        
        )
    }
    else if (currState === 'game') {
        return(
             <Box sx={styles.root}>
              <Grid container
                spacing={1}
                direction='column'
                justifyContent="center" 
                alignItems="center">
                    <Grid item xs='auto'>
                        <h3 style={{fontSize: "30px", margin: "0"}}>Select a Game</h3>
                    </Grid>
                    <Grid item xs='auto'>
                        <Button
                            onClick={() => {setGame("Deep Signal") }}>
                        <GameCard title="Deep Signal" 
                                  numOfPlayers="3"
                                  duration="30"
                                  introduction="Deeep deeep signal"/>
                        </Button>
                    </Grid>
                    <Grid item xs='auto'>
                    <Button
                        variant="contained"
                        onClick={() => {setCurrState('calendar')}}
                        disabled={game == ''}
                        sx={styles.bookingButton}>Select the game</Button>
                    </Grid>
                </Grid>
             </Box>
        )
    }
    else {
        return (
         <Box sx={styles.root}> 
             <Grid container
                spacing={2}
                direction='column'
                justifyContent="center" 
                alignItems="center">
                <Grid item xs='auto'>
                    <h3 style={{fontSize: "30px", margin: "0"}}>Choose a session</h3>
                </Grid>
                <Grid item xs='auto'>
                <h5 style={{fontSize: "20px", margin: "0"}}>Select a time</h5>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        date={date}
                        onChange={(newValue) => {
                        setDate(newValue);
                        setDateStr(moment(date).format('YYYY-MM-DD'));
                        }}/>
                </LocalizationProvider>
                </Grid>
                <Grid item xs='auto'>
                    <h4> Selected date is {dateStr}</h4>
                </Grid>
                
            </Grid>
       </Box>)
    }
}


function BookingPage() {
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
        // await bookSession(date, groupSize, duration, time)
        router.push({
            pathname: "/booking/info",
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
