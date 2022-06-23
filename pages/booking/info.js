import React, { useState, useEffect } from "react";
import BookingContactForm from "../../components/booking/BookingContactForm";
import { useRouter } from "next/router";
import { Button, TextField, Grid, IconButton, FormGroup, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import BookingDetailsForm from "../../components/booking/BookingDetailsForm";
import { css } from "@emotion/react"
import { bookSession } from "../../lib/services/booking-service";
import { Box } from '@mui/system';
import { firestore } from "../../firebase/clientApp";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { validateEmailInput } from "../../lib/helpers/input-validator";
import Cookies from 'js-cookie';
import { INPUT_TYPES } from "../../lib/constants/input-types";

export default function BookingInfoPage() {
    const styles = {
        root: css`
            margin: 2rem auto 0 auto;
          `,
        bookingButton: css`
            margin: 0 auto;
            display: block;
            textAlign: center
        `
    }
    const router = useRouter();
    const { date, groupSize, duration, time } = router.query;
    const [loading, setLoading] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        email: "",
        firstName: "",
        lastName: ""
    })
    const [isValidInputs, setValidInputs] = useState({
        email: null,
        firstName: null,
        lastName: null
    })
    const [isAgreementChecked, setAgreementChecked] = useState(false);

    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(info => ({ ...info, [name]: value }));
        validateContactInputs(name, value);
    }

    const validateContactInputs = (name, value) => {
        switch (name) {
            case INPUT_TYPES.EMAIL:
                setValidInputs(input => ({ ...input, [name]: validateEmailInput(value) === true }));
                break;
            case INPUT_TYPES.FIRST_NAME:
            case INPUT_TYPES.LAST_NAME:
                setValidInputs(input => ({ ...input, [name]: value !== "" }));
                break;
            default:
                break;
        }
    }


    const handleBooking = async () => {
        setLoading(true);
        // Use router query data to transfer booking details to confirmation page
        await bookSession(date, groupSize, duration, time);
        // Integrating firestore database
        await firestore.collection("sessions").doc().set({
            ...contactInfo,
            date: date,
            time: time,
            duration: duration,
            groupSize: groupSize
        });
        setLoading(false);

        router.push({
            pathname: "/booking/success",
            query: {
                date: date,
                time: time,
                duration: duration,
                groupSize: groupSize
            }
        });
        // log out of guest account
        Cookies.remove("customerToken");
    }

    return (
        <Box sx={styles.root}>
            <IconButton onClick={() => {
                router.replace({
                    pathname: "/booking",
                    shallow: true,
                    query: {
                        groupSize: groupSize
                    }
                })
            }}>
                <ChevronLeftIcon />
            </IconButton>
            <h1 style={{ textAlign: "center", marginTop: "0" }}>Confirm your booking</h1>
            <BookingDetailsForm date={date} time={time} duration={duration} groupSize={groupSize} />
            <h3 style={{ textAlign: "center" }}>Enter Your Info</h3>
            <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs="auto">
                    <TextField
                        required
                        id="standard-required"
                        name="firstName"
                        label="First Name"
                        onChange={handleContactInfoChange}
                        error={isValidInputs.firstName === false}
                        fullWidth
                    />
                </Grid>
                <Grid item xs="auto">
                    <TextField
                        required
                        id="standard-required"
                        name="lastName"
                        label="Last Name"
                        onChange={handleContactInfoChange}
                        error={isValidInputs.lastName === false}
                        fullWidth
                    />
                </Grid>
                <Grid item xs="auto">
                    <TextField
                        required
                        id="standard-required"
                        name="email"
                        label="Email"
                        onChange={handleContactInfoChange}
                        error={isValidInputs.email === false}
                        fullWidth
                    />
                </Grid>
                <Grid item xs="auto" >
                    <FormControlLabel control={<Checkbox checked={isAgreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)} />} label="I agree to the Terms of Use" />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                sx={styles.bookingButton}
                onClick={() => handleBooking()}
                disabled={Object.values(isValidInputs).includes(false) || Object.values(isValidInputs).includes(null) || isAgreementChecked === false}
            >{loading ? <CircularProgress sx={{ width: "60%", color: "white" }} /> : null}
                Book your experience</Button>
        </Box>
    )
}