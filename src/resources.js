const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '608777e920b27420a041c68646f66380';

const locApiUrl = 'http://ip-api.com/json';

function getUrl(query, resource) {
  return (
    apiUrl + resource + '?q=' + query + '&APPID=' + apiKey + '&units=metric'
  );
}

function getWeatherUrl(query) {
  return getUrl(query, 'weather');
}

function getForecastUrl(query) {
  return getUrl(query, 'forecast');
}

export function getWeatherUrls(query) {
  return [getWeatherUrl(query), getForecastUrl(query)];
}

export function getLocUrl() {
  return locApiUrl;
}
