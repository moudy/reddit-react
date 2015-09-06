import { Router } from 'express';
import { useRoutes } from 'react-router';
import { renderMiddleware } from  './view';
import React from  'react'; React;
import { renderToString } from  'react-dom/server';
import createHistory from 'history/lib/createMemoryHistory';
import createLocation from 'history/lib/createLocation';

import configureStore from './app/store/configureStore';
import Root from './app/containers/Root';

import { routes } from './app/routes';

const router = Router();

router.use(renderMiddleware);
router.get('/', function (req, res) {
  const location = createLocation(req.originalUrl);
  const history = createHistory({entries: [location]});
  const store = configureStore();

  const html = renderToString(
    <Root history={history} store={store} routes={routes} />
  );
  res.renderApp(html);
});

export default router;

