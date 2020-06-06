import { SET_CURSOR_POSITION, SET_MOUSE_DOWN } from './types';

export const setCursorPosition = (position) => {
  return {
    type: SET_CURSOR_POSITION,
    payload: position
  }
}

export const setMouseDown = (bool) => {
  return {
    type: SET_MOUSE_DOWN,
    payload: bool
  }
}