import { DateTime } from 'luxon';

export function extractDataToDisplay([weather, forecast]) {
  return [extractWeather(weather), extractForecast(forecast)];
}

function extractWeather(weather) {
  return {
    city: `${weather.name}, ${weather.sys.country}`,
    temp: `${Math.round(weather.main.temp)} °C`,
    tempImp: getFahrenheit(weather.main.temp),
    pressure: `${weather.main.pressure} hPa`,
    humidity: `${weather.main.humidity} %`,
    desc: weather.weather[0].description,
    img: getImgUrl(weather.weather[0].icon),
    wind: getWind(weather.wind),
    time: getDateTime(weather.dt, weather.timezone),
    sunrise: getTime(weather.sys.sunrise, weather.timezone),
    sunset: getTime(weather.sys.sunset, weather.timezone)
  };
}

function extractForecast(forecast) {
  return forecast.list.map(f => ({
    temp: `${Math.round(f.main.temp)} °C`,
    tempImp: getFahrenheit(f.main.temp),
    desc: f.weather[0].main,
    img: getImgUrl(f.weather[0].icon),
    date: getDate(f.dt, forecast.city.timezone),
    time: getTime(f.dt, forecast.city.timezone)
  }));
}

function getFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32) + ' °F';
}

function getDate(utc, timezone) {
  const time = DateTime.fromSeconds(utc + timezone, { zone: 'UTC' });
  return time.toFormat('ccc LLL d');
}

function getTime(utc, timezone) {
  const time = DateTime.fromSeconds(utc + timezone, { zone: 'UTC' });
  return time.toFormat('HH:mm');
}

function getDateTime(utc, timezone) {
  return getDate(utc, timezone) + ' ' + getTime(utc, timezone);
}

function getImgUrl(id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
}

function getWind({ speed, deg }) {
  if (!deg) return `${Math.round(speed)}m/s`;
  const dirs = [
    'N',
    'N-NE',
    'NE',
    'E-NE',
    'E',
    'E-SE',
    'SE',
    'S-SE',
    'S',
    'S-SW',
    'SW',
    'W-SW',
    'W',
    'W-NW',
    'NW',
    'N-NW'
  ];
  const i = Math.floor(deg / 22.5 + 0.5) % 16;
  return `${Math.round(speed)}m/s ${dirs[i]}`;
}

export function extractCity(resp) {
  return `${resp.city},${resp.country_code}`;
}
