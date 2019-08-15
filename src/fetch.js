export function fetchData(url) {
  return fetch(url, { mode: 'cors' }).then(response => {
    if (!response.ok) throw Error(response.status);
    return response.json();
  });
}
