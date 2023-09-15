import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

const printError = (err) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${err}`);
};

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${msg}`);
};

const printHelp = () => {
  console.log(
    dedent`
    ${chalk.bgCyan(' HELP ')}
    Without params - shows weather
    -s <city> - saves city
    -h - shows help
    -t <token> - saves token
  `
  );
};

const printWeather = (res) => {
  console.log(
    dedent`
    ${chalk.bgCyan(' WEATHER ')}
    ${chalk.bold(res.name)}
    ${chalk.bold(res.main.temp)}°C
    ${chalk.bold(res.weather[0].description)} ${getIcon(res.weather[0].icon)}
    
    ${chalk.bold(res.main.humidity)}% humidity
    ${chalk.bold(res.wind.speed)} m/s wind
    ${chalk.bold(res.main.pressure)} hpa pressure
    ${chalk.bold(res.main.temp_min)}°C min temp
    ${chalk.bold(res.main.temp_max)}°C max temp
    ${chalk.bold(res.sys.sunrise)} sunrise
    ${chalk.bold(res.sys.sunset)} sunset
  `
  );
};

export { printError, printSuccess, printHelp, printWeather };
