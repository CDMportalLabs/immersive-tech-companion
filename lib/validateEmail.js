const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";

export default async function validateEmail(email) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const url = "https://api.synthesisvr.com/web/" + SYNTHESIS_PUBLIC_KEY + "/customers/validateEmail"
    
        const response = await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                return result;
            })
            .catch(error => console.log('error', error));
        return response;

    } catch (err) {
        console.log(err);
    }
}