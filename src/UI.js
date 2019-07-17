import { getWeather, getCurrCity } from './index';

export function init() {
  const form = document.querySelector('#city-input');
  form.addEventListener('submit', citySubmit);
  const currLoc = document.querySelector('.curr-location');
  currLoc.addEventListener('click', currClick);
}

function citySubmit(e) {
  e.preventDefault();
  showLoader();
  hideErrors();
  hideMain();
  const city = e.target[0].value;
  getWeather(city);
}

function currClick() {
  showLoader();
  hideErrors();
  hideMain();
  getCurrCity();
}

export function renderData([weatherData, forecastData]) {
  renderWeather(weatherData);
  renderForecast(forecastData);
  hideLoader();
  hideErrors();
  showMain();
}

function renderWeather(data) {
  Object.keys(data).forEach(key => {
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
  [...forecastDiv.children].forEach(el => el.remove());
  data.forEach(d => {
    const elem = buildForecastElem(d);
    forecastDiv.appendChild(elem);
  });
}

export function renderError(err) {
  const errorElem = document.querySelector('.errors');
  if (err.message === '404') {
    errorElem.textContent = 'Sorry, city not found';
  } else {
    errorElem.textContent = 'Something went wrong...';
    console.error(err);
  }
  hideLoader();
  hideMain();
  showErrors();
}

function buildForecastElem(data) {
  const time = document.createElement('div');
  time.classList.add('time');
  time.textContent = data.time;

  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = data.temp;

  const tempImp = document.createElement('div');
  tempImp.classList.add('temp-imp');
  tempImp.textContent = data.tempImp;

  const desc = document.createElement('div');
  desc.classList.add('desc');
  desc.textContent = data.desc;

  const img = document.createElement('img');
  img.classList.add('img');
  img.src = data.img;

  const wind = document.createElement('div');
  wind.classList.add('wind');
  wind.textContent = data.wind;

  const forecastElem = document.createElement('div');
  forecastElem.classList.add('forecast');

  forecastElem.appendChild(time);
  forecastElem.appendChild(temp);
  forecastElem.appendChild(tempImp);
  forecastElem.appendChild(desc);
  forecastElem.appendChild(img);
  forecastElem.appendChild(wind);

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
