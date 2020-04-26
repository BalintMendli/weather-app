import { bgMap } from './constants';

export function init(getWeather, getCurrentCity) {
  const form = document.querySelector('.input-form');
  form.addEventListener('submit', citySubmit.bind(null, getWeather));
  const currLoc = document.querySelector('.curr-location');
  currLoc.addEventListener('click', currCityClick.bind(null, getCurrentCity));
  const units = document.querySelector('.units');
  units.addEventListener('click', unitsClick);
}

function citySubmit(getWeather, e) {
  e.preventDefault();
  const city = e.target[0].value;
  showLoader();
  hideErrors();
  hideMain();
  getWeather(city);
}

function currCityClick(getCurrentCity, e) {
  e.preventDefault();
  showLoader();
  hideErrors();
  hideMain();
  getCurrentCity();
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
  setBg(data.icon);
  Object.keys(data).forEach((key) => {
    const elem = document.querySelector(`.weather-box .${key}`);
    if (key === 'img') {
      elem.src = data[key];
    } else if (elem) {
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

export function handleLocError(err) {
  const errorElem = document.querySelector('.errors');
  errorElem.textContent =
    'Error getting current location... Try disabling your adblocker';
  console.error(err);
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
  const template = document.querySelector('#forecast-template');
  var forecastElem = template.content.cloneNode(true);
  Object.keys(data).forEach((key) => {
    const elem = forecastElem.querySelector(`.${key}`);
    if (key === 'img') {
      elem.src = data[key];
    } else if (elem) {
      elem.textContent = data[key];
    }
  });
  return forecastElem;
}

function setBg(icon) {
  if (bgMap[icon]) {
    const bgUrl = `img/${bgMap[icon]}.jpg`;
    const elems = document.querySelectorAll('body, .blur');
    elems.forEach((e) => {
      e.style.backgroundImage = `url(${bgUrl})`;
    });
  }
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
