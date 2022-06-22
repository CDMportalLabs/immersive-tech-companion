import Cookies from 'js-cookie'
import { authenticate } from './auth-service';

const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";
const GUEST_USERNAME = process.env.NEXT_PUBLIC_GUEST_BOOKING_USERNAME || "";
const GUEST_PASSWORD = process.env.NEXT_PUBLIC_GUEST_BOOKING_PASSWORD || "";

/*
bookSession
params: date (YYYY-MM-DD), groupSize, duration, time, comment, experienceID
returns: object (json response)
effects: None
*/
async function bookSession(date, groupSize, duration, time, comment, experienceId) {
	let customerToken;

	if (!Cookies.get('customerToken')) {
		const guestUser = await authenticate(GUEST_USERNAME, GUEST_PASSWORD);
		customerToken = guestUser.token;
	} else {
		customerToken = Cookies.get('customerToken');
	}

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	const urlencoded = new URLSearchParams();
	urlencoded.append("customer_token", customerToken);
	urlencoded.append("date", date); // May need to change the format for the date
	urlencoded.append("people", groupSize);
	urlencoded.append("duration", duration);
	urlencoded.append("time", time);
	urlencoded.append("coupons", "");
	urlencoded.append("comment", comment);
	urlencoded.append("experience", experienceId ? experienceId : 2626);


	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
	};

	const response = await fetch(`https://api.synthesisvr.com/web/${SYNTHESIS_PUBLIC_KEY}/book`, requestOptions)
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

	return response;

}

async function checkAvailabilities(date, groupSize, duration, experienceId) {
	const apiUrl = `https://api.synthesisvr.com/web/${SYNTHESIS_PUBLIC_KEY}/availability?people=${groupSize}&date=${date}&duration=${duration}&experience=${experienceId ? experienceId : 2626}`;
	const response = await fetch(apiUrl)
		.then(response => response.json())
		.then(result => {
			return result
		})
		.catch(error => console.log('error', error));

	return response;
}

export {
	bookSession,
	checkAvailabilities

}