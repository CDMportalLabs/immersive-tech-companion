import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import BookingConfirmation from "../../components/bookingPage";

export default function BookingSuccess() {
    const date = Cookies.get('date');
	const time = Cookies.get('time');
    return (
        <BookingConfirmation date={date} time={time}/>
    )
  }