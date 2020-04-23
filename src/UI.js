import { getWeather, getCurrCity } from './index';

export function init() {
  const form = document.querySelector('.input-form');
  form.addEventListener('submit', citySubmit);
  const currLoc = document.querySelector('.curr-location');
  currLoc.addEventListener('click', currClick);
  const units = document.querySelector('.units');
  units.addEventListener('click', unitsClick);
}

function citySubmit(e) {
  e.preventDefault();
  showLoader();
  hideErrors();
  hideMain();
  const city = e.target[0].value;
  getWeather(city);
}

function currClick(e) {
  e.preventDefault();
  showLoader();
  hideErrors();
  hideMain();
  getCurrCity();
}

function unitsClick(e) {
  const el = e.target;
  const main = document.querySelector('.main');
  if (el.classList.contains('celsius')) {
    main.classList.remove('imperial');
  }
  if (el.classList.contains('fahrenheit')) {
    main.classList.add('imperial');
  }
}

export function renderData([weatherData, forecastData]) {
  renderWeather(weatherData);
  renderForecast(forecastData);
  hideLoader();
  hideErrors();
  showMain();
}

function renderWeather(data) {
  Object.keys(data).forEach((key) => {
    const elem = document.querySelector(`.weather-box .${key}`);
    if (key === 'img') {
      elem.src = data[key];
    } else {
      elem.textContent = data[key];
    }
  });
}

function renderForecast(data) {
  const forecastDiv = document.querySelector(`.forecast-box`);
  [...forecastDiv.children].forEach((el) => el.remove());
  data.forEach((d) => {
    const elem = buildForecastElem(d);
    forecastDiv.appendChild(elem);
  });
}

export function handleError(err) {
  const errorElem = document.querySelector('.errors');
  if (err.message === '404') {
    errorElem.textContent = 'Sorry, city not found';
  } else {
    errorElem.textContent =
      'Ooops, something went wrong... Consider switching off your adblocker';
    console.error(err);
  }
  hideLoader();
  hideMain();
  showErrors();
}

export function handleWeatherError(err) {
  const errorElem = document.querySelector('.errors');
  if (err.message === '404') {
    errorElem.textContent = 'Sorry, city not found';
  } else {
    errorElem.textContent = 'Ooops, something went wrong...';
    console.error(err);
  }
  hideLoader();
  hideMain();
  showErrors();
}

function buildForecastElem(data) {
  const date = document.createElement('div');
  date.classList.add('date');
  date.textContent = data.date;

  const time = document.createElement('div');
  time.classList.add('time');
  time.textContent = data.time;

  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = data.temp;

  const tempImp = document.createElement('div');
  tempImp.classList.add('tempImp');
  tempImp.textContent = data.tempImp;

  const desc = document.createElement('div');
  desc.classList.add('desc');
  desc.textContent = data.desc;

  const img = document.createElement('img');
  img.classList.add('img');
  img.src = data.img;

  const forecastElem = document.createElement('div');
  forecastElem.classList.add('forecast');

  forecastElem.appendChild(date);
  forecastElem.appendChild(time);
  forecastElem.appendChild(img);
  forecastElem.appendChild(temp);
  forecastElem.appendChild(tempImp);
  forecastElem.appendChild(desc);

  return forecastElem;
}

function showLoader() {
  document.querySelector('.loader').classList.remove('hide');
}

function hideLoader() {
  document.querySelector('.loader').classList.add('hide');
}

function showMain() {
  document.querySelector('.main').classList.remove('hide');
  document.querySelector('.inputs').classList.add('up');
}

function hideMain() {
  document.querySelector('.main').classList.add('hide');
}

function showErrors() {
  document.querySelector('.errors').classList.remove('hide');
}

function hideErrors() {
  document.querySelector('.errors').classList.add('hide');
}
