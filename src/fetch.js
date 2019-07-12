export function fetchData(url) {
  return fetch(url)
    .then(handleErrors)
    .then(resp => resp.json());
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status);
  return response;
}
