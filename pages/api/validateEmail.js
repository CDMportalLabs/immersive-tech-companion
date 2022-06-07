import axios from "axios";

const SYNTHESIS_PUBLIC_KEY = process.env.NEXT_PUBLIC_SYNTHESIS_PUBLIC_KEY || "";

const handler = async (req, res) => {
    try {
        const body = req.body
        const url = "https://api.synthesisvr.com/web/" + SYNTHESIS_PUBLIC_KEY + "/customers/validateEmail";
        const response = await axios.post(url, {
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            },
            data: body
        });
        res.status(200).send(response.data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to validate email: " + err);
    }
}

export default handler