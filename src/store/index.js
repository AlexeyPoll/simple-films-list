import thunk from 'redux-thunk';
import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers'

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default configureStore({
  reducer: rootReducer,
  enhancer
})