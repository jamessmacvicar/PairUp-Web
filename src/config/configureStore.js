import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import reducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunk, logger));
  return createStore(reducer, initialState, enhancer);
}
