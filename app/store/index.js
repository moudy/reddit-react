import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import posts from './reducers/posts';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const reducer = combineReducers({
  posts
});


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
