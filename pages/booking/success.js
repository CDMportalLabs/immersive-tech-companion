import React, { useState, useEffect } from "react";
import BookingConfirmation from "../../components/bookingPage";
import {useRouter} from "next/router";

export default function BookingSuccess() {
    const { query } = useRouter();
    return (
        <BookingConfirmation date={query.date} time={query.time}/>
    )
  }