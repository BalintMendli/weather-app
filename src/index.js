import { init, renderData, renderError } from './UI.js';
import { getUrl } from './resources.js';
import { fetchData } from './fetch.js';

const extractData = data => ({
  city: `${data.name}, ${data.sys.country}`,
  temp: Math.round(data.main.temp)
});

init(submitCity);

function submitCity(e) {
  e.preventDefault();
  const city = e.target[0].value;
  getWeather(city);
}

function getWeather(city) {
  fetchData(getUrl(city))
    .then(console.log)
    // .then(extractData)
    // .then(renderData)
    .catch(renderError);
}
