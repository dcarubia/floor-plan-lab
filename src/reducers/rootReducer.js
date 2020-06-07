import { combineReducers } from 'redux';
import toolReducer from './toolReducer';
import cursorReducer from './cursorReducer';
import sheetReducer from './sheetReducer';

export default combineReducers({
  tool: toolReducer,
  cursor: cursorReducer,
  sheet: sheetReducer
});