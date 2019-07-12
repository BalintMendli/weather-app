import { init, renderData, renderError } from './UI.js';
import { getWeatherUrls } from './resources.js';
import { fetchData } from './fetch.js';

const extractDataToDisplay = ([weather, forecast]) => {
  console.log(weather, forecast);
  const extractedWeather = {
    city: `${weather.name}, ${weather.sys.country}`,
    temp: Math.round(weather.main.temp),
    pressure: weather.main.pressure,
    humidity: weather.main.humidity,
    desc: weather.weather[0].main,
    icon: weather.weather[0].icon,
    wind: weather.wind,
    time: weather.dt + weather.timezone
  };
  const extractedForecast = forecast.list.map(f => ({
    temp: f.main.temp,
    desc: f.weather[0].main,
    icon: f.weather[0].icon,
    wind: f.wind,
    time: f.dt + weather.timezone
  }));
  console.log(extractedForecast);
  return [extractedWeather, extractedForecast];
};

init(submitCity);

function submitCity(e) {
  e.preventDefault();
  const city = e.target[0].value;
  getWeather(city);
}

function getWeather(city) {
  Promise.all(getWeatherUrls(city).map(fetchData))
    .then(extractDataToDisplay)
    // .then(console.log)
    .then(renderData)
    .catch(console.log);
}
