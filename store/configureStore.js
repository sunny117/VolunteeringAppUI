import { createStore, combineReducers } from 'redux';

import authReducer from './Reducers/authReducer';
import sampleReducer from './Reducers/sampleReducer';


const reducers = combineReducers({
  authReducer,
  sampleReducer
});

export const store = createStore(
  reducers
);