//@ts-check

import { configureStore } from '@reduxjs/toolkit';
import createReducer from './rootReducer';

// if (process.env.NODE_ENV === 'development' ) {
//   module?.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default;
//     store.replaceReducer(newRootReducer.createReducer());
//   });
// }

const middlewares: any[] = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({ collapsed: (getState:any, action:any, logEntry:any) => !logEntry.error });

  middlewares.push(logger);
}

const store : any = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

store.asyncReducers = {};

export const injectReducer = (key:any, reducer:any) => {
  if (store && store?.asyncReducers && store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
