"use client";

import WeatherApi from "@/api/WeatherApi";
import { useState } from "react";
import { Loader } from "lucide-react";
import Information from "@/components/Information/Information";

export default function Home() {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // these state information can be separated and saved within a store like zustand or redux or a context provider
        setIsLoading(true);
        setError("");
        setWeather(null);

        const response = await WeatherApi.getWeatherByCity(city);

        if (response.error) {
            // here we can customize the error message to show wether the api didn't find the location/city or the api failed
            setError(response.error);
        } else {
            // we can save city/location weather in localstorage using a custom hook to save and read the data from localstorage
            // we can load the data from localstorage in zustand for example
            setWeather(response.data);
        }

        setIsLoading(false);
    };

    return (
        <div className="w-full pt-8">
            <h1 className="text-center text-3xl md:text-5xl px-6 text-black/90">
                Weather App
            </h1>

            <div className="max-w-5xl mx-auto w-full px-5 md:px-8">
                <form
                    type="submit"
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center gap-3 md:gap-2 py-8"
                >
                    <div className="flex flex-col w-full md:w-[70%]">
                        {/* input can be a reusable component with custom styles */}
                        {/* we can show city/location suggestions when typing and use a custom hook useDebounce to look for city/location suggestions with debounced search 500ms */}
                        <input
                            type="text"
                            name="city"
                            className="border border-black/30 p-2 rounded-md text-xs md:text-[medium]"
                            placeholder="Enter a city or country..."
                            required
                            onChange={(event) => setCity(event.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-[30%]">
                        {/* button can be a reusable component with custom styles */}
                        <button className="bg-primary-100 hover:bg-primary-100/90 border-primary-100 border-1 disabled:bg-gray-400/30 p-2 rounded-md text-white cursor-pointer text-xs md:text-[medium]">
                            {isLoading ? (
                                <Loader
                                    className="animate-spin mx-auto my-0"
                                    size={20}
                                />
                            ) : (
                                "SEARCH"
                            )}
                        </button>
                    </div>
                </form>

                {weather && !isLoading && <Information weather={weather} />}
                {error && !isLoading && (
                    <h1>
                        There was an error getting weather information, please
                        try again...
                    </h1>
                )}
            </div>
        </div>
    );
}
