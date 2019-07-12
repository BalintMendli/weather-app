export function init(cb) {
  const form = document.querySelector('#city-input');
  form.addEventListener('submit', cb);
}

export function renderData([weatherData, forecastData]) {
  renderWeather(weatherData);
  renderForecast(forecastData);
}

function renderWeather(data) {
  Object.keys(data).forEach(key => {
    const elem = document.querySelector(`.weather-box .${key}`);
    elem.textContent = data[key];
  });
}

function renderForecast(data) {
  const forecastDiv = document.querySelector(`.forecast-box`);
  data.forEach(d => {
    const elem = buildForecastElem(d);
    forecastDiv.appendChild(elem);
  });
}

export function renderError(err) {
  if (err.message === '404') {
    console.log('City not found');
  } else {
    console.log('Something went wrong...');
  }
}

function buildForecastElem(data) {
  const time = document.createElement('div');
  time.classList.add('time');
  time.textContent = data.time;

  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = data.temp;

  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.textContent = data.icon;

  const wind = document.createElement('div');
  wind.classList.add('wind');
  wind.textContent = data.wind;

  const forecastElem = document.createElement('div');
  forecastElem.classList.add('forecast');

  forecastElem.appendChild(time);
  forecastElem.appendChild(temp);
  forecastElem.appendChild(icon);
  forecastElem.appendChild(wind);

  return forecastElem;
}
