import { SET_ANCHOR, UPDATE_EDGES, UPDATE_WALLS, ADD_TEXT, DELETE_TEXT, SET_CUR_SHAPE, UPDATE_SELECTED, DELETE_WALLS, CREATE_WALLS, SET_SCALE, ADD_OBJECT, DELETE_OBJECT, SET_NEW_FILE, UPDATE_OBJECT, SET_WALL, LOAD_FILE, UPDATE_TEXT } from './types';
import { v4 as uuidv4 } from 'uuid';
import { boxSize } from '../config';

export const addText = () => {
  return {
    type: ADD_TEXT,
    payload: { id: uuidv4(), value: "", position: { x: (boxSize + 1) * 2, y: (boxSize + 1) * 2 } }
  }
}

export const addObject = (type) => {
  return {
    type: ADD_OBJECT,
    payload: { id: uuidv4(), type, position: { x: (boxSize + 1) * 2, y: (boxSize + 1) * 2 } }
  }
}

// @param file: { scale, walls, objects, text }
export const loadFile = (file) => {
  return {
    type: LOAD_FILE,
    payload: file
  }
}

// @param data: {id, position}
export const updateObject = (data) => {
  return {
    type: UPDATE_OBJECT,
    payload: { id: data.id, position: data.position }
  }
}

// @param data: {row, col, value}
export const setWall = (data) => {
  return {
    type: SET_WALL,
    payload: data
  }
}

export const deleteObject = (id) => {
  return {
    type: DELETE_OBJECT,
    payload: id
  }
}

export const setScale = (num) => {
  return {
    type: SET_SCALE,
    payload: num
  }
}

export const setNewFile = () => {
  return {
    type: SET_NEW_FILE,
    payload: {}
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

// @param data: {id, position, value}
export const updateText = (data) => {
  return {
    type: UPDATE_TEXT,
    payload: { id: data.id, position: data.position, value: data.value }
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