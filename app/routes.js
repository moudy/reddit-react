import AppContainer from './containers/AppContainer';
import IndexContainer from './containers/IndexContainer';
import AboutContainer from './containers/AboutContainer';

export const routes = [{
  component: AppContainer,
  childRoutes: [
    { path: '/', component: IndexContainer },
    { path: 'about', component: AboutContainer }
  ]
}];
