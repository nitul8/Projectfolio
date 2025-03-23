import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const place = searchParams.get("place");

    if (!place) {
        return NextResponse.json({error: "Place is required"}, {status: 400});
    }

    const API_KEY = "6e16a80e48a54f4bbe2192532252203";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=3&aqi=yes&alerts=yes`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch weather data"},
            {status: 500}
        );
    }
}
