import { SET_CURSOR_POSITION } from './types';

export const setCursorPosition = (position) => {
  return {
    type: SET_CURSOR_POSITION,
    payload: position
  }
}