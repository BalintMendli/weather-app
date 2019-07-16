import { DateTime } from 'luxon';

export function extractDataToDisplay([weather, forecast]) {
  console.log(weather, forecast);
  return [extractWeather(weather), extractForecast(forecast)];
}

function extractWeather(weather) {
  return {
    city: `${weather.name}, ${weather.sys.country}`,
    temp: `${Math.round(weather.main.temp)} °C`,
    tempImp: getFahrenheit(weather.main.temp),
    pressure: `${weather.main.pressure} hPa`,
    humidity: `${weather.main.humidity} %`,
    desc: weather.weather[0].main,
    img: getImgUrl(weather.weather[0].icon),
    wind: getWind(weather.wind),
    time: getTime(weather.dt, weather.timezone)
  };
}

function extractForecast(forecast) {
  return forecast.list.map(f => ({
    temp: `${Math.round(f.main.temp)} °C`,
    tempImp: getFahrenheit(f.main.temp),
    desc: f.weather[0].main,
    img: getImgUrl(f.weather[0].icon),
    wind: getWind(f.wind),
    time: getTime(f.dt, forecast.city.timezone)
  }));
}

function getFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32) + ' °F';
}

function getTime(utc, timezone) {
  const time = DateTime.fromSeconds(utc + timezone, { zone: 'UTC' });
  return time.toFormat('ccc LLL d HH:mm');
}

function getImgUrl(id) {
  return `http://openweathermap.org/img/wn/${id}@2x.png`;
}

function getWind({ speed, deg }) {
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
  return `${Math.round(speed)} m/s ${dirs[i]}`;
}

export function extractCity(resp) {
  console.log(`${resp.city},${resp.country_code}`);
  return `${resp.city},${resp.country_code}`;
}
