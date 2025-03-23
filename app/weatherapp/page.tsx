"use client";
import React, {useState} from "react";

import {IoIosMoon, IoIosSunny} from "react-icons/io";
import {LuDroplets} from "react-icons/lu";
import {FaWind} from "react-icons/fa";

const Weather = () => {
    interface WeatherData {
        location: {
            name: string;
            region: string;
            country: string;
            localtime: string;
        };
        current: {
            temp_c: number;
            humidity: number;
            wind_mph: number;
            uv: number;
            is_day: boolean;
            condition: {
                icon: string;
            };
        };
        forecast: {
            forecastday: {
                date: string;
                day: {maxtemp_c: number; mintemp_c: number};
            }[];
        };
    }

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [place, setPlace] = useState("");

    const fetchWeather = async (name: string) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=6e16a80e48a54f4bbe2192532252203&q=${name}&days=3&aqi=yes&alerts=yes`
            );
            const data = await response.json();
            console.log(data);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const formatDate = (localdate: string) => {
        const date = new Date(localdate);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-500 to-indigo-500">
            <form className="mb-6 flex justify-between items-center space-x-3">
                <input
                    type="text"
                    placeholder="Search for places..."
                    className="w-4/5 max-w-lg bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-lg text-white"
                    value={place.toLowerCase()}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-2/5 max-w-lg bg-white/20 backdrop-blur-md p-3 rounded-lg shadow-lg text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!location) return;
                        fetchWeather(place);
                    }}
                >
                    Search
                </button>
            </form>
            {weather && (
                <div className="w-4/5 max-w-lg bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center text-white">
                        <div>
                            <h3 className="text-xl font-semibold">
                                {weather.location.name}
                            </h3>
                            <p className="text-sm text-white/80">
                                {weather.location.region},{" "}
                                {weather.location.country}
                            </p>
                        </div>
                        <span className="text-sm flex flex-col items-end">
                            <p className="text-sm text-white/80">
                                {weather.location.localtime.split(" ")[1]}
                            </p>
                            <p className="text-sm text-white/80">
                                {weather.location.localtime.split(" ")[0]}
                            </p>
                        </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-start">
                            <span className="text-6xl font-bold text-white">
                                {weather.current.temp_c}
                            </span>
                            <span className="mt-1 text-2xl text-white/80">
                                °C
                            </span>
                        </div>
                        <img
                            src={weather.current.condition.icon}
                            alt="Weather Icon"
                            className="h-20 w-20"
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {[
                            {
                                label: "Humidity",
                                value: `${weather.current.humidity}%`,
                                icon: <LuDroplets />,
                            },
                            {
                                label: "Wind",
                                value: `${weather.current.wind_mph} mph`,
                                icon: <FaWind />,
                            },
                            {
                                label: "UV Index",
                                value: `${weather.current.uv}`,
                                icon: weather.current.is_day ? (
                                    <IoIosSunny />
                                ) : (
                                    <IoIosMoon />
                                ),
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-white"
                            >
                                <span className="text-xl m-2">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                                <span className="text-lg font-semibold">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-medium text-white/80 mb-3">
                            3-Day Forecast
                        </h4>
                        {[
                            {
                                day: "Today",
                                temp: `${weather.forecast.forecastday[0].day.mintemp_c}° / ${weather.forecast.forecastday[0].day.maxtemp_c}°`,
                            },
                            {
                                day: "Tomorrow",
                                temp: `${weather.forecast.forecastday[1].day.mintemp_c}° / ${weather.forecast.forecastday[1].day.maxtemp_c}°`,
                            },
                            {
                                day: `${formatDate(
                                    weather.location.localtime.split(" ")[0]
                                )}`,
                                temp: `${weather.forecast.forecastday[2].day.mintemp_c}° / ${weather.forecast.forecastday[2].day.maxtemp_c}°`,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white/10 p-3 rounded-md mb-2"
                            >
                                <span className="text-white">{item.day}</span>
                                <span className="text-white">{item.temp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
