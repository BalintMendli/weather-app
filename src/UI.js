export function init(cb) {
  const form = document.querySelector('#city-input');
  form.addEventListener('submit', cb);
}

export function renderData(data) {
  const root = document.querySelector('.weather-box');
  root.textContent = data.city;
}

export function renderError(err) {
  if (err.message === '404') {
    console.log('City not found');
  } else {
    console.log('Something happened...');
  }
}
