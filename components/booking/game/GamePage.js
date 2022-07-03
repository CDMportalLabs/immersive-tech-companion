import { css } from "@emotion/react";
import React, { useState } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GameCard from './GameCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css';
import { Pagination } from "swiper";

const GamePage = ({ game, setGame, setLocation, setCurrState }) => {

    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        gameButton: css`
          margin: 6rem 2rem 0 auto;
          display: block;
          textAlign: center;
          color: white;
          width: 20rem;
          height: 5rem;
      `,
    }

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
                            setGame('');
                            setLocation('');
                            setCurrState('location');
                        }}
                    >
                        <ChevronLeftIcon /></IconButton>
                    <h3 style={{ fontSize: "40px", margin: "0", marginRight: "5rem" }}>Select a Game</h3>
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
                                onClick={() => { setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal"
                                    numOfPlayers="3"
                                    duration="30"
                                    introduction="Deeep deeep signal" />
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
                                onClick={() => { setGame("Deep Signal") }}>
                                <GameCard title="Deep Signal"
                                    numOfPlayers="3"
                                    duration="30"
                                    introduction="Deeep deeep signal" />
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

export default GamePage;