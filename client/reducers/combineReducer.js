import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';

export default combineReducers({
  mainPage: mainPageReducer,
});