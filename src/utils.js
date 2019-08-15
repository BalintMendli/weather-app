import { DateTime } from 'luxon';

export function parseData([weather, forecast]) {
  return [parseWeather(weather), parseForecast(forecast)];
}

function parseWeather({
  name,
  main: { temp, pressure, humidity },
  weather: [{ description, icon }],
  sys: { country, sunrise, sunset },
  wind,
  dt,
  timezone
}) {
  return {
    city: `${name}, ${country}`,
    temp: `${Math.round(temp)} °C`,
    tempImp: getFahrenheit(temp),
    pressure: `${pressure} hPa`,
    humidity: `${humidity} %`,
    desc: description,
    img: getImgUrl(icon),
    wind: getWind(wind),
    time: getDateTime(dt, timezone),
    sunrise: getTime(sunrise, timezone),
    sunset: getTime(sunset, timezone)
  };
}

function parseForecast(forecast) {
  return forecast.list.map(
    ({ main: { temp }, weather: [{ main, icon }], dt }) => ({
      temp: `${Math.round(temp)} °C`,
      tempImp: getFahrenheit(temp),
      desc: main,
      img: getImgUrl(icon),
      date: getDate(dt, forecast.city.timezone),
      time: getTime(dt, forecast.city.timezone)
    })
  );
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

export function parseCity(resp) {
  return `${resp.city},${resp.country_code}`;
}
