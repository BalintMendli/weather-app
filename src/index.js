import { init, renderData, renderError } from './UI.js';
import { getWeatherUrls, getLocUrl } from './resources.js';
import { fetchData } from './fetch.js';
import { extractDataToDisplay, extractCity } from './utils';

function getWeather(city) {
  Promise.all(getWeatherUrls(city).map(fetchData))
    .then(extractDataToDisplay)
    .then(renderData)
    .catch(renderError);
}

function getCurrCity() {
  fetchData(getLocUrl())
    .then(extractCity)
    .then(getWeather);
}

init();

export { getWeather, getCurrCity };
