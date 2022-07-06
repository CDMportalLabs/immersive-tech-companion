import { css } from "@emotion/react";
import React, { useState } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, IconButton, List, ListItem } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GameCard from './GameCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css';
// import { Pagination } from "swiper";

const GamePage = ({ game, setGame, setLocation, setCurrState }) => {

    const styles = {
        gameButton: css`
          margin: 6rem 2rem 0 auto;
          display: block;
          textAlign: center;
          color: white;
          width: 20rem;
          height: 5rem;
      `
    }

    return (
        <Box>
            <Grid container
                spacing={3}
                direction='column'
                justifyContent="center"
                alignItems="center"
                margin="2rem auto 2rem auto">
                <Grid item container direction='row' spacing={1} alignItems="center" xs='auto'>
                    <Grid item xs="auto">
                        <IconButton
                            onClick={() => {
                                setGame('');
                                setLocation('');
                                setCurrState('location');
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs="auto">
                        <h3 style={{ fontSize: "40px", margin: "0", marginRight: "5rem" }}>Select a Game</h3>
                    </Grid>
                </Grid>
                <Grid item marginTop="2rem">           
                    <Swiper
                        grabCursor={true}
                        slidesPerView={2}
                        spaceBetween={250}
                        // centeredSlides={true}
                        // loop={true}
                        
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Button
                                onClick={() => { setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal"
                                    numOfPlayers="3"
                                    duration="30"
                                    introduction="Deeep deeep signal" />
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                onClick={() => { setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal"
                                    numOfPlayers="3"
                                    duration="30"
                                    introduction="Deeep deeep signal" />
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Button
                                onClick={() => { setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal"
                                    numOfPlayers="3"
                                    duration="30"
                                    introduction="Deeep deeep signal" />
                            </Button>
                        </SwiperSlide>
                        <SwiperSlide>   </SwiperSlide>                    
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

export default GamePage;