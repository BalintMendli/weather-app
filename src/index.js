import { init, renderData, renderError } from './UI.js';
import { getWeatherUrls, getLocUrl } from './resources.js';
import { fetchData } from './fetch.js';
import { parseData, parseCity } from './utils';

function getWeather(city) {
  Promise.all(getWeatherUrls(city).map(fetchData))
    .then(parseData)
    .then(renderData)
    .catch(renderError);
}

function getCurrCity() {
  fetchData(getLocUrl())
    .then(parseCity)
    .then(getWeather);
}

init();

export { getWeather, getCurrCity };
