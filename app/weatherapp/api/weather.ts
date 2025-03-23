import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {place} = req.query;

    if (!place) {
        return res.status(400).json({error: "Place is required"});
    }

    const API_KEY = "6e16a80e48a54f4bbe2192532252203";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=3&aqi=yes&alerts=yes`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({error: "Failed to fetch weather data"});
    }
}
