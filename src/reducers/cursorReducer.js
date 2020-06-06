import { SET_CURSOR_POSITION, SET_MOUSE_DOWN } from '../actions/types';

const initState = {
  position: null,
  mouseDown: false
}

const toolReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURSOR_POSITION:
      return {
        ...state,
        position: action.payload
      }
    case SET_MOUSE_DOWN:
      return {
        ...state,
        mouseDown: action.payload
      }
    default:
      return state;
  }
}

export default toolReducer;