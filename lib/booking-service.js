import Cookies from 'js-cookie'


/*
bookSession
params: date (YYYY-MM-DD), number of people, duration, time, comment, experienceID
returns: object (json response)
effects: None
*/

function bookSession(date, numberOfPeople, duration, time, comment, experienceID) {
	const customerToken = Cookies.get('customer_token');
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	const urlencoded = new URLSearchParams();
	urlencoded.append("customer_token", customerToken);
	urlencoded.append("date", date); // May need to change the format for the date
	urlencoded.append("people", numberOfPeople);
	urlencoded.append("duration", duration);
	urlencoded.append("time", time);
	urlencoded.append("coupons", "");
	urlencoded.append("comment", comment);
	urlencoded.append("experience", experienceID);

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
	};
	
	const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";
	
	fetch(`https://api.synthesisvr.com/web/${SYNTHESIS_PUBLIC_KEY}/book`, requestOptions)
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	
	
}