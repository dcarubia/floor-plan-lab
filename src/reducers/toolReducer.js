import { SET_TOOL } from '../actions/types';

const initState = {
  current: 'POINTER'
}

const toolReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOOL:
      return {
        ...state,
        current: action.payload
      }
    default:
      return state;
  }
}

export default toolReducer;