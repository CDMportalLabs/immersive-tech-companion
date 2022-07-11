import React, { useState, useEffect } from "react";
import BookingConfirmation from "../../components/booking/BookingConfirmation";
import {useRouter} from "next/router";
import { Button } from "@mui/material";
import { Box } from '@mui/system';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function BookingConfirmationPage() {
    const {query} = useRouter();
    const {date, time, location, game, duration} = query;
    const [ email, setEmail ] = useState("");

    useEffect(() => {
        if (Cookies.get("email")) {
            console.log(Cookies.get("email"))
            setEmail(Cookies.get("email"));
            setTimeout(() => {
                Cookies.remove("email");
            }, 3000);
        }
        return;
    }, []);

    return (
        <Box>
            <BookingConfirmation date={date} time={time} location={location} game={game} duration={duration} email={email}/>
            <Link href="/sign-up">
                <Button variant="contained" sx={{margin: "0 auto", display: "block"}}>
                    Sign up for an account with us!</Button>
            </Link>
        </Box>
    )
  }