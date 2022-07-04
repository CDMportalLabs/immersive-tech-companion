import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, List, ListItemButton } from "@mui/material";
import LocationCard from './LocationCard';
import { useTheme } from "@mui/material/styles";

const LocationPage = ({ location, setLocation, setCurrState }) => {
    const theme = useTheme()

    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        locationButton: css`
            margin: auto 2rem 0 auto;
            display: block;
            textAlign: center;
            color: white;
            width: 20rem;
            height: 5rem;
        `
    }

    return (
        <Box sx={styles.root}>
            <h3 style={{ fontSize: "40px", marginLeft: "2rem" }}>Select a Location</h3>
            <List>
                <ListItemButton selected={location === 'Vancouver'} sx={{"&.Mui-selected": {border: `2px solid ${theme.palette.primary.main}`}}} alignItems="flex-start" onClick={() => {
                    setLocation('Vancouver')
                }}>
                    <LocationCard location='Vancouver'
                        address1='4077 Kingsway, Burnaby'
                        address2='Richmond, V5H1Y9'
                        img=''
                        isSelected={location === 'Vancouver'} />
                </ListItemButton>
                <ListItemButton alignItems="flex-start" selected={location === 'Toronto'} sx={{"&.Mui-selected": {border: `2px solid ${theme.palette.primary.main}`}}} onClick={() => {
                    setLocation('Toronto')
                }}>
                    <LocationCard location='Toronto'
                        address1='4077 Kingsway, Burnaby'
                        address2='Richmond, V5H1Y9'
                        img=''
                        isSelected={location === 'Toronto'} />
                </ListItemButton>
                <ListItemButton alignItems="flex-start" selected={location === 'New York'} sx={{"&.Mui-selected": {border: `2px solid ${theme.palette.primary.main}`}}} onClick={() => {
                    setLocation('New York')
                }}>
                    <LocationCard location='New York'
                        address1='4077 Kingsway, Burnaby'
                        address2='Richmond, V5H1Y9'
                        img=''
                        isSelected={location === "New york"} />
                </ListItemButton>
            </List>
            <Button
                variant="contained"
                onClick={() => { setCurrState('game') }}
                disabled={location == ''}
                sx={styles.locationButton}>Select the location</Button>
        </Box>
    )
}

export default LocationPage;