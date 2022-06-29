import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { IconButton, Button, Grid} from "@mui/material";
import { useRouter } from 'next/router';
import { bookSession, checkAvailabilities } from "../../lib/services/booking-service";
import moment from 'moment';
import { css } from "@emotion/react"
import LocationCard from "../../components/LocationCard";
import GameCard from "../../components/GameCard";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css';
import { Pagination } from "swiper";


export default function NewBookingPage() {
    
    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        grid: css`
            margin: 2rem auto 0 auto;
          `,
        locationButton: css`
            margin: 8rem 2rem 0 auto;
            display: block;
            textAlign: center;
            color: white;
            width: 20rem;
            height: 5rem;
            
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
    
    const [groupSize, setGroupSize] = useState(3);
    const [dateStr, setDateStr] = useState(moment().format('YYYY-MM-DD'));
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(15);
    const [availabilities, setAvailabilities] = useState([]);
    const [location, setLocation] = useState('');
    const [game, setGame] = useState('');
    const [time, setTime] = useState('');
    const [currState, setCurrState] = useState('location');
    const [timeVisible, setTimeVisible] = useState(false);
    
    const handleSearchAvabilities = () => {
        try {
            checkAvailabilities(dateStr, groupSize, duration)
                .then((resp) => {
                    console.log(resp);
                    const availableTimes = resp.times ? Object.values(resp.times) : [];
                    setAvailabilities(availableTimes);
                })
        } catch (err) {
            console.log(err);
        }
    }
    
      useEffect((props) => {
            checkAvailabilities(dateStr, groupSize, duration)
            .then((resp) => {
                //console.log(resp);
                const availableTimes = resp.times ? Object.values(resp.times) : [];
                setAvailabilities(availableTimes);
            })
        return;
    }, [dateStr, groupSize, duration]);

    const handleBooking = () => {
        // Use router query data to transfer booking details to confirmation page
        // await bookSession(date, groupSize, duration, time)
        router.push({
            pathname: "/booking/info",
            query: {
                date: dateStr,
                time: time,
                duration: duration,
                groupSize: groupSize,
                location: location
            }
        });
    }
    
    if (currState === 'location') {
        return (
        <Box css={styles.root}>
            <Grid container
                spacing={2}
                direction='column'
                justifyContent="center" 
                alignItems="center"
                margin="2rem auto 0 auto">
                <Grid item>
                   <h3 style={{fontSize: "40px", margin: "0", marginRight:"2rem"}}>Select a Location</h3>
                </Grid>
                <Grid item xs='auto' marginRight="2rem">
                    <Button 
                        onClick={() => {
                                setLocation('Vancouver')}}> 
                        <LocationCard location='Vancouver'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={location === 'Vancouver'}/>
                    </Button>
                </Grid>
                <Grid item xs='auto' marginRight="2rem">
                    <Button 
                        onClick={() => {
                        setLocation('Toronto')
                        }}> <LocationCard location='Toronto'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={location === 'Toronto'}/>
                    </Button>
                </Grid>
                <Grid item xs='auto' marginRight="2rem">
                    <Button 
                        onClick={() => {
                        setLocation('New york')
                        }}> <LocationCard location='New york'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={location === "New york"}/>
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                <Button
                    variant="contained"
                    onClick={() => {setCurrState('game')}}
                    disabled={location == ''}
                    sx={styles.locationButton}>Select the location</Button>
                </Grid>
            </Grid>
        </Box>
        )
    }
    else if (currState === 'game') {
        return(
            <Box css={styles.root}>
              <Grid container
                spacing={2}
                direction='column'
                justifyContent="center" 
                alignItems="center"
                margin="2rem auto 0 auto">
                    <Grid item container direction='row' xs='auto'>
                    <IconButton
                            onClick={() => {
                                setGame('');
                                setLocation('');
                                setCurrState('location');
                                
                            }}
                    > 
                    <ChevronLeftIcon /></IconButton>
                        <h3 style={{fontSize: "40px", margin: "0", marginRight:"5rem"}}>Select a Game</h3>
                    </Grid>
                    <Grid item xs="auto" marginRight="2rem">
                    <Swiper
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                        >
                        <SwiperSlide
                            style={{
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                width: "400px",
                                height: "70vh"
                            }}>
                            <Button
                                onClick={() => {setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal" 
                                        numOfPlayers="3"
                                        duration="30"
                                        introduction="Deeep deeep signal"/>
                            </Button>   
                        </SwiperSlide>
                        <SwiperSlide
                            style={{
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                width: "50px",
                                height: "70vh"
                            }}>
                            <Button
                                onClick={() => {setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal" 
                                        numOfPlayers="3"
                                        duration="30"
                                        introduction="Deeep deeep signal"/>
                            </Button>   
                        </SwiperSlide>
                        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
                        </Swiper>
                        
                    </Grid>
                    <Grid item xs='auto'>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setCurrState('calendar') 
                            }}
                        disabled={game == ''}
                        sx={styles.gameButton}>Select the game</Button>
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
                alignItems="center"
                margin="2rem auto 0 auto">
                       <Grid item container direction='row' xs='auto'>
                    <IconButton
                            onClick={() => {
                                setDateStr(moment().format('YYYY-MM-DD'));
                                setDate(new Date());
                                setGame('');
                                setCurrState('game');   
                                router.push({ query: {} });
                            }}
                    > 
                    <ChevronLeftIcon /></IconButton>
                        <h3 style={{fontSize: "30px", margin: "0", marginRight:"5rem"}}>Choose a session</h3>
                    </Grid>
                <Grid item xs='auto'>
                <h5 style={{fontSize: "20px", margin: "0.5rem 2rem"}}>Select a date</h5>
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
                                onChange = {(newValue) => {
                                    console.log('newValue is:', newValue);
                                    console.log('old value is:', date);
                                    setDate(newValue);
                                    setDateStr(moment(newValue).format('YYYY-MM-DD'));
                                    console.log(dateStr);
                                    handleSearchAvabilities();
                                    setTimeVisible(true);
                                }}
                        />
                    {timeVisible && availabilities.length > 0 &&
                      <Grid item container spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            <h5 style={{ fontSize: "20px", margin: "0.5rem 0" }}>Select a 30 min session</h5>
                            <Box style={{ fontSize: "15px"}}>Please arrive 20 mins early to avoid delays</Box>
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
            <Box style={{"textAlign": "center"}}>
                <Button
                    variant="contained"
                    onClick={() => {setCurrState('calendar')
                                    handleBooking(time)}}
                    disabled={time == ''}
                    sx={styles.timeSelectionButton}>Select this session
                    </Button>
            </Box>
       </Box>)
    }
}
