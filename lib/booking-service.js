import Cookies from 'js-cookie'

/*
bookSession
params: date (YYYY-MM-DD), groupSize, duration, time, comment, experienceID
returns: object (json response)
effects: None
*/

function bookSession(date, groupSize, duration, time, comment, experienceId) {
	const customerToken = Cookies.get('customerToken');
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
	urlencoded.append("experience", experienceId);
	

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
	};
	
	const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";
	
	const response = fetch(`https://api.synthesisvr.com/web/${SYNTHESIS_PUBLIC_KEY}/book`, requestOptions)
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	
	return response;
		
}

export default bookSession;