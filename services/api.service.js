import https from 'https';
import { getByKey, STORE_NAMES } from './storage.service.js';
import axios from 'axios';

const api = new URL('https://api.openweathermap.org/data/2.5/weather');

export const getIcon = (icon) => {
  const icons = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '🌨',
    '50d': '🌫',
    '01n': '🌑',
    '02n': '🌑',
    '03n': '🌑',
    '04n': '🌑',
    '09n': '🌧',
    '10n': '🌧',
    '11n': '⛈',
    '13n': '🌨',
    '50n': '🌫',
  };
  return icons[icon];
};

const getWeather = async (city) => {
  const token = await getByKey(STORE_NAMES.token);
  if (!token) {
    throw new Error('No token provided, set it with -t <token>');
  }
  const response = await axios.get(api, {
    params: {
      q: city,
      appid: token,
      lang: 'en',
      units: 'metric',
    }
  });

  return response.data;
};

export default getWeather;