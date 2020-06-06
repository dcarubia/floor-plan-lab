import { SET_TOOL } from './types';

export const setTool = (toolName) => {
  return {
    type: SET_TOOL,
    payload: toolName
  }
}