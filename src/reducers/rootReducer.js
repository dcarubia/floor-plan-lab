import { combineReducers } from 'redux';
import toolReducer from './toolReducer';
import cursorReducer from './cursorReducer';

export default combineReducers({
  tool: toolReducer,
  cursor: cursorReducer
});