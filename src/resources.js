const url = 'https://api.openweathermap.org/data/2.5/';

const resource = 'weather';

const apiKey = '608777e920b27420a041c68646f66380';

export function getUrl(query) {
  return url + resource + '?q=' + query + '&APPID=' + apiKey + '&units=metric';
}
