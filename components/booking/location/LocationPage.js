import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid } from "@mui/material";
import LocationCard from './LocationCard';

const LocationPage = ({ location, setLocation, setCurrState }) => {

    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        locationButton: css`
            margin: 7rem 2rem 0 auto;
            display: block;
            textAlign: center;
            color: white;
            width: 20rem;
            height: 5rem;
        `
    }

    return (
        <Box sx={styles.root}>
            <Grid container
                spacing={2}
                direction='column'
                justifyContent="center"
                alignItems="center"
                margin="2rem auto 0 auto">
                <Grid item>
                    <h3 style={{ fontSize: "40px", margin: "0", marginRight: "2rem" }}>Select a Location</h3>
                </Grid>
                <Grid item xs='auto' marginRight="2rem">
                    <Button
                        onClick={() => {
                            setLocation('Vancouver')
                        }}>
                        <LocationCard location='Vancouver'
                            address1='4077 Kingsway, Burnaby'
                            address2='Richmond, V5H1Y9'
                            img=''
                            isSelected={location === 'Vancouver'} />
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
                            isSelected={location === 'Toronto'} />
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
                            isSelected={location === "New york"} />
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button
                        variant="contained"
                        onClick={() => { setCurrState('game') }}
                        disabled={location == ''}
                        sx={styles.locationButton}>Select the location</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LocationPage;