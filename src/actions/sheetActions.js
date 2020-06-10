import { SET_ANCHOR, UPDATE_EDGES, UPDATE_WALLS, ADD_TEXT, DELETE_TEXT, SET_CUR_SHAPE, UPDATE_SELECTED, DELETE_WALLS, CREATE_WALLS } from './types';
import { v4 as uuidv4 } from 'uuid';

export const addText = (type) => {
  return {
    type: ADD_TEXT,
    payload: uuidv4()
  }
}

export const setCurShape = (shape) => {
  return {
    type: SET_CUR_SHAPE,
    payload: shape
  }
}

export const deleteText = (index) => {
  return {
    type: DELETE_TEXT,
    payload: index
  }
}

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

export const deleteWalls = () => {
  return {
    type: DELETE_WALLS,
    payload: null
  }
}

export const createWalls = () => {
  return {
    type: CREATE_WALLS,
    payload: null
  }
}

export const updateSelected = (selArr) => {
  return {
    type: UPDATE_SELECTED,
    payload: selArr
  }
}