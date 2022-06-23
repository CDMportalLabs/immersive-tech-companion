import Cookies from 'js-cookie'

const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";
const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

async function validateEmail(email) {
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
}

async function register({email, password, firstName, lastName}) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("name", firstName + " " + lastName);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const url = "https://api.synthesisvr.com/web/" + SYNTHESIS_PUBLIC_KEY + "/customers/create"

    const response = await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result;
        })
        .catch(error => console.log('error', error));
    return response;
}

async function authenticate({email, password}, rememberMe) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const url = "https://api.synthesisvr.com/web/" + SYNTHESIS_PUBLIC_KEY + "/customers/auth"

    const response = await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            console.log(Cookies.get('customerToken'));
            if (rememberMe) {
                Cookies.set('customerToken', result.token, {expires: inFifteenMinutes, sameSite: 'strict', secure: true});
            }
            return result;
        })
        .catch(error => console.log('error', error));
    return response;
}

export {
    validateEmail,
    register,
    authenticate
}