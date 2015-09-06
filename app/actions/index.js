import { GET } from '../api';

export const REDDIT_REQUEST_START = 'REDDIT_REQUEST_START';
export const REDDIT_REQUEST_SUCCESS = 'REDDIT_REQUEST_SUCCESS';

export function redditRequestStart() {
  return {
    type: REDDIT_REQUEST_START
  };
}

export function redditRequestEnd(response) {
  return {
    type: REDDIT_REQUEST_SUCCESS,
    response: response
  };
}

export function requestDataFromRedditAsync() {
  const url = 'http://www.reddit.com/.json';
  return (dispatch /*, getState  */) => {
    dispatch(redditRequestStart());
    setTimeout(() => {
      GET(url).then(function (json) {
        dispatch(redditRequestEnd(json));
      });
    }, 1000);
  };
}

