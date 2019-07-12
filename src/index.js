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
  const extractedForecast = forecast.list.map((f, i) => ({
    [`f-temp-${i}`]: f.main.temp,
    [`f-desc-${i}`]: f.weather[0].main,
    [`f-icon-${i}`]: f.weather[0].icon,
    [`f-wind-${i}`]: f.wind,
    [`f-time-${i}`]: f.dt + weather.timezone
  }));
  const extractedData = extractedForecast.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    extractedWeather
  );
  console.log(extractedData);
  return extractedData;
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
    .then(console.log)
    // .then(renderData)
    .catch(console.log);
}
