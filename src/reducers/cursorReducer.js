import { SET_CURSOR_POSITION } from '../actions/types';

const initState = {
  position: null,
}

const toolReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURSOR_POSITION:
      return {
        ...state,
        position: action.payload
      }
    default:
      return state;
  }
}

export default toolReducer;