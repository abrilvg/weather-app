const API_KEY = "78d41e726878449887713230251306";
const URL = "https://api.weatherapi.com/v1/current.json";

const WeatherApi = {
    getWeatherByCity: async (city) => {
        try {
            const params = new URLSearchParams({
                key: API_KEY,
                q: city,
            });
            const response = await fetch(`${URL}?${params.toString()}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to fetch weather information"
                );
            }
            return {
                data,
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
};

export default WeatherApi;
