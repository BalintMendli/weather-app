import { init, renderData, handleError, handleWeatherError } from './UI.js';
import { getWeatherUrls, getLocationUrl } from './resources.js';
import { fetchData } from './fetch.js';
import { parseData, parseCity } from './utils';

function getWeather(city) {
  Promise.all(getWeatherUrls(city).map(fetchData))
    .then(parseData)
    .then(renderData)
    .catch(handleWeatherError);
}

function getCurrCity() {
  fetchData(getLocationUrl())
    .then(parseCity)
    .then(getWeather)
    .catch(handleError);
}

init();

export { getWeather, getCurrCity };
