import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import users from './usersSlice'
import asset from './assetSlice'

const appReducers = combineReducers({
  dialog,
  users,
  asset
});

export default appReducers;
