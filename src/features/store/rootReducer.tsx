//@ts-check
import { combineReducers } from '@reduxjs/toolkit';
import app from './app'

const createReducer = (asyncReducers?:any) => (state:any, action:never) => {
  const combinedReducer = combineReducers({
   app,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  // if (action.type === 'auth/user/userLoggedOut') {
  //   state = undefined;
  // }

  return combinedReducer(state, action);
};

export default createReducer;
