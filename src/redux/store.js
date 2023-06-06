import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';

export default createStore(
  composeWithDevTools(applyMiddleware(middleware)),
);