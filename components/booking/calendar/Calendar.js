import * as React from 'react';
import { css } from "@emotion/react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box } from '@mui/system';
import { Avatar, TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";

export default function Calendar({ availabilities, date, timeVisible, setDate, setDateStr, setTime }) {

  const styles = {
    timeButton: css`
        background-color: #FFFFFF;
        color: black;
    `,
}

  return (
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
        onChange={(newValue) => {
          console.log('newValue is:', newValue);
          console.log('old value is:', date);
          setDate(newValue);
          setDateStr(moment(newValue).format('YYYY-MM-DD'));
          console.log(date);
        }}
      />
      {timeVisible && availabilities.length > 0 &&
        <Grid item container spacing={2} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs="auto">
            <h5 style={{ fontSize: "20px", margin: "0.5rem 0" }}>Select a 30 min session</h5>
            <Box style={{ fontSize: "15px" }}>Please arrive 20 mins early to avoid delays</Box>
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
  );
}