import React, { useState, useEffect } from "react";
import BookingConfirmation from "../../components/booking/BookingConfirmation";
import {useRouter} from "next/router";
import { Button } from "@mui/material";
import { Box } from '@mui/system';
import Link from 'next/link';

export default function BookingConfirmationPage() {
    const {query} = useRouter();
    const {date, time, location, game} = query;
    return (
        <Box>
            <BookingConfirmation date={date} time={time} location={location} game={game}/>
            <Link href="/sign-up">
                <Button variant="contained" sx={{margin: "0 auto", display: "block"}}>
                    Sign up for an account with us!</Button>
            </Link>
        </Box>
    )
  }