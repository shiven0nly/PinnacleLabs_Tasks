import {useState} from 'react';
import axios from 'axios';

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            // Points to backend , running on port 5000
            const response = await axios.get(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
            setWeatherData(response.data);
        } catch(err) {
            setError(err.response?.data?.error || 'Failed to fetch weather data. Try again');
            setWeatherData(null);
        } finally {
            setLoading(false);
        };
    };
    return {weatherData, loading, error, fetchWeather};
}