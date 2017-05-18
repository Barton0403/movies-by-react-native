import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

export default function configureStore() {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, createLogger({ collapsed: true }))
  );
  return store;
}
