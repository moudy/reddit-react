import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';
import 'isomorphic-fetch';

const isProduction = process.env.NODE_ENV === 'production';
const distIndexHTMLPath = path.join(process.cwd(), 'dist', 'index.html');
const distIndexHTML = fs.readFileSync(distIndexHTMLPath).toString();

function serializedState(state) {
  return `
    <script>
      window.__INITIAL_STATE__= ${serialize(state)};
    </script>`;
}

function injectedHTML(indexHTML, appHTML, stateHTML) {
  const splitString = '<div id=\'root\'>';
  const indexHTMLParts = indexHTML.split(splitString);

  return `${indexHTMLParts[0]}${stateHTML}${splitString}${appHTML}${indexHTMLParts[1]}`;
}

function renderApp(indexHTML) {
  return function(appHTML = '', state = {}) {
    this.send(injectedHTML(indexHTML, appHTML, serializedState(state)));
  };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function renderMiddleware(req, res, next) {
  if (isProduction) {
    res.renderApp = renderApp(distIndexHTML);
    next();
  } else {
    fetch('http://localhost:8080/')
      .then(checkStatus)
      .then(res => res.text())
      .then((text) => {
        res.renderApp = renderApp(text);
        next();
      })
      .catch((e) => {
        console.log('Could not load index.html');
        console.log(e);
      });
  }
}
