import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, List, ListItem, ListItemButton } from "@mui/material";
import LocationCard from './LocationCard';
import { useTheme } from "@mui/material/styles";

const LocationPage = ({ location, setLocation, setCurrState }) => {
    const theme = useTheme()

    const styles = {
        root: css`
            background-color: #FAF9F6;
          `,
        list: css`
            display: flex;
            flex-direction: column;
            justify-content: center;
        `,
        listItemButton: css`
            padding: 0;
            margin: 1rem;
            border-radius: 16px;
            &.Mui-selected {
                box-shadow: 0px 7px 40px rgba(255, 0, 74, 0.1);
                border: 1px solid ${theme.palette.primary.main}
            }
        `,
        locationButton: css`
            margin: 2rem auto;
            display: block;
            textAlign: center;
            color: white;
            width: 20rem;
            height: 5rem;
        `
    }

    return (
        <Box sx={styles.root}>
            <List sx={styles.list}>
                <ListItem alignItems="center">
                    <h1 style={{ fontSize: "30px", margin: "1rem auto", color: "black" }}>Select a Location</h1>
                </ListItem>
                <ListItemButton selected={location === 'Vancouver'} sx={styles.listItemButton} alignItems="center" onClick={() => {
                    setLocation('Vancouver')
                }}>
                    <LocationCard location='Vancouver'
                        address1='4077 Kingsway, Burnaby'
                        address2='Richmond, V5H1Y9'
                        img=''
                        isSelected={location === 'Vancouver'} />
                </ListItemButton>
                <ListItemButton alignItems="center" selected={location === 'Toronto'} sx={styles.listItemButton} onClick={() => {
                    setLocation('Toronto')
                }}>
                    <LocationCard location='Toronto'
                        address1='4077 Kingsway, Burnaby'
                        address2='Richmond, V5H1Y9'
                        img=''
                        isSelected={location === 'Toronto'} />
                </ListItemButton>
                <ListItemButton alignItems="center" selected={location === 'New York'} sx={styles.listItemButton} onClick={() => {
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