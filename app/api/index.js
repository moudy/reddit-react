import 'isomorphic-fetch';
import ES6Promise from 'es6-promise';
ES6Promise.polyfill();

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export function GET(url: string): Promise {
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      console.log('request failed', error); // eslint-disable-line no-console
    });
}


