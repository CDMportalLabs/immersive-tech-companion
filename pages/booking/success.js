import React, { useState, useEffect } from "react";
import BookingConfirmation from "../../components/booking/BookingConfirmation";
import {useRouter} from "next/router";
import { Button } from "@mui/material";
import { Box } from '@mui/system';
import Link from 'next/link';

export default function BookingConfirmationPage() {
    const {query} = useRouter();
    return (
        <Box>
            <BookingConfirmation date={query.date} time={query.time}/>
            <Link href="/sign-up">
                <Button variant="contained" sx={{margin: "0 auto", display: "block"}}>
                    Sign up for an account with us!</Button>
            </Link>
        </Box>
    )
  }