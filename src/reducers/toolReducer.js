import { SET_TOOL } from '../actions/types';

const initState = {
  current: 'SELECT'
}

const toolReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOOL:
      return {
        current: action.payload
      }
    default:
      return state;
  }
}

export default toolReducer;