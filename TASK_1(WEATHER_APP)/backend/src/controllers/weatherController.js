// CORE LOGIC

// Controller intercepts the request, grabs the city query parameter, securely appends your hidden API key, calls the external weather API, and formats the response for the FrontEnd

import axios from 'axios';

export const getWeatherData = async (req, res) => {
    try{
        const { city } = req.query;

        // 1. Validation
        if(!city) {
            return res.status(400).json({erro: 'City parameter is required'});
        }

        const API_KEY = process.env.WEATHER_API_KEY;
        if(!API_KEY) {
            return res.status(500).json({error: 'Server configuration error: Missing'});
        }
        console.log("Using API Key:", API_KEY);

     // 2. Fetch current weather data from OpenWeatherMap
     // (using metric units by default; change to imperial or pass as a variable)
     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
     const weatherResponse = await axios.get(weatherUrl);

     //3. Fetch 5-day forecast data using coordinates from the first response
     const { lat, lon } = weatherResponse.data.coord;
     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
     const forecastResponse = await axios.get(forecastUrl);

     // 4. Structure a clearn response so our react app doesnt have to parse raw mess
     const payLoad = {
        current: {
            cityName: weatherResponse.data.name,
            temp: weatherResponse.data.main.temp,
            feelsLike: weatherResponse.data.main.feels_like,
            humidity: weatherResponse.data.main.humidity,
            windSpeed: weatherResponse.data.wind.speed,
            condition: weatherResponse.data.weather[0].main,
            description: weatherResponse.data.weather[0].description,
            icon: weatherResponse.data.weather[0].icon
        },
        forecast: forecastResponse.data.list.filter((_, index) => index % 8 === 0)
        // The API return data every 3 hours. Filtering by index % 8 gives us 1 reading per day (24h / 3h = 8)
     };
     return res.status(200).json(payLoad)
    }

    catch(error) {
        // Handle external API errors gracefully (eg: city not found)
        if(error.response) {
            return res.status(error.response.status).json ({
                error: error.response.data.message || 'Error fetching data from weather service'
            })
        }

        console.error('Server Error:', error.message);
        return res.status(500).json({error: 'Internal server error'});
    }
};