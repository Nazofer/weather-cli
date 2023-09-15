import getArgs from './helpers/args.js';
import getWeather from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, getByKey, STORE_NAMES } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Token is required');
    return;
  }
  try {
    await saveKeyValue(STORE_NAMES.token, token);
    printSuccess('Token saved');
  } catch (e) {
    printError(`Error saving token: ${e.message}`);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('City is required');
    return;
  }
  try {
    await saveKeyValue(STORE_NAMES.city, city);
    printSuccess('City saved');
  } catch (e) {
    printError(`Error saving city: ${e.message}`);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY || await getByKey(STORE_NAMES.city);
    const weather = await getWeather(city);
    printWeather(weather);

  } catch (error) {
    if (error?.response?.status === 404) {
      printError(`Error: city not found`);
    } else if (error?.response?.status === 401) {
      printError(`Error: invalid token`);
    } else {
      printError(`Error: ${error.message}`);
    }
  }
}


const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};

initCLI();