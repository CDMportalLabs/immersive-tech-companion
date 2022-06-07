import axios from "axios";

export default async function validateEmail(email) {
    try {
        const url = "/api/validateEmail";
        const response = await axios.post(url, {email: email});
        return response.data;
    } catch (err) {
        console.log(err);
    }
}