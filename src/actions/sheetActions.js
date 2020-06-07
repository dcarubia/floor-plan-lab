import { SET_ANCHOR, UPDATE_EDGES, UPDATE_WALLS } from './types';

export const setAnchor = (position) => {
  return {
    type: SET_ANCHOR,
    payload: position
  }
}

export const updateEdges = (edgesArr) => {
  return {
    type: UPDATE_EDGES,
    payload: edgesArr
  }
}

export const updateWalls = (wallsArr) => {
  return {
    type: UPDATE_WALLS,
    payload: wallsArr
  }
}