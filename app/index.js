// This creates the main css file included in index.html
import './css/app.scss';

import 'babel-core/polyfill';
import React from 'react'; React;
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createHistory from 'history/lib/createBrowserHistory';
import { configureStore } from './store';
import { routes } from './routes';

const store = configureStore();

ReactDOM.render(
  <Root history={createHistory()} store={store} routes={routes} />,
  document.getElementById('root')
);

