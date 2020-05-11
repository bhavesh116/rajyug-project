/* eslint-disable import/no-cycle */
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/rootReducer'

const logger = createLogger({
  duration: true,
  timestamp: true,
  diff: true,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger),
);

export default store;
