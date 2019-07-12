export function init(formCb, currLocCb) {
  const form = document.querySelector('#city-input');
  form.addEventListener('submit', formCb);
  const currLoc = document.querySelector('.curr-location');
  currLoc.addEventListener('click', currLocCb);
}

export function renderData([weatherData, forecastData]) {
  deleteErrors();
  renderWeather(weatherData);
  renderForecast(forecastData);
  document.querySelector('.main').classList.remove('hide');
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
  document.querySelector('.main').classList.add('hide');
  const errorElem = document.querySelector('.errors');
  if (err.message === '404') {
    errorElem.textContent = 'Sorry, city not found';
  } else {
    errorElem.textContent = 'Something went wrong...';
  }
}

function deleteErrors() {
  const errorElem = document.querySelector('.errors');
  errorElem.textContent = '';
}

function buildForecastElem(data) {
  const time = document.createElement('div');
  time.classList.add('time');
  time.textContent = data.time;

  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = data.temp;

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
  forecastElem.appendChild(desc);
  forecastElem.appendChild(img);
  forecastElem.appendChild(wind);

  return forecastElem;
}
