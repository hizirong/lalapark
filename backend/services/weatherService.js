// backend/services/weatherService.js
const axios = require('axios');

exports.getCurrentWeather = async (lat, lng) => {
  try {
    // 以 OpenWeatherMap 為例
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=zh_tw`;
    const { data } = await axios.get(url);

    // 可根據 weather 狀態碼判定是否下雨
    const weatherDescription = data.weather[0].description.toLowerCase();
    const isRaining = weatherDescription.includes('rain');

    return {
      temperature: data.main.temp,
      isRaining,
      weatherDescription,
    };
  } catch (err) {
    console.error('Error fetching weather', err);
    return {
      temperature: null,
      isRaining: false,
      weatherDescription: 'unknown',
    };
  }
};
