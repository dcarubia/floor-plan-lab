import {
  SET_ANCHOR,
  UPDATE_EDGES,
  UPDATE_WALLS,
  ADD_TEXT,
  DELETE_TEXT,
  SET_CUR_SHAPE,
  UPDATE_SELECTED,
  DELETE_WALLS,
  CREATE_WALLS,
  SET_SCALE,
  ADD_OBJECT,
  DELETE_OBJECT,
  SET_NEW_FILE,
  UPDATE_OBJECT,
  SET_WALL,
  LOAD_FILE,
  UPDATE_TEXT
} from '../actions/types';

const initializeSheet = () => {
  const rows = [];
  // Create 100 rows
  for (let i = 0; i < 100; i++) {
    const curRow = [];
    for (let j = 0; j < 150; j++) {
      // Create 100 items in each row
      curRow.push(null)
    }
    // add current row to rows array
    rows.push(curRow);
  }
  return rows;
};

const initializeWalls = () => {
  const rows = [];
  // Create 100 rows
  for (let i = 0; i < 100; i++) {
    const curRow = [];
    for (let j = 0; j < 150; j++) {
      // Create 100 items in each row
      curRow.push(false)
    }
    // add current row to rows array
    rows.push(curRow);
  }
  return rows;
};

const initState = {
  scale: {
    ft: 1,
    in: 0
  },
  curShape: null,
  text: [],
  objects: [],
  walls: initializeWalls(),
  anchor: null,
  data: {
    anchors: initializeSheet(),
    edges: initializeSheet(),
    selected: initializeSheet()
  }
}

const sheetReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SCALE:
      return {
        ...state,
        scale: action.payload
      }
    case SET_NEW_FILE:
      return {
        scale: {
          ft: 1,
          in: 0
        },
        curShape: null,
        text: [],
        objects: [],
        walls: initializeWalls(),
        anchor: null,
        data: {
          anchors: initializeSheet(),
          edges: initializeSheet(),
          selected: initializeSheet()
        }
      }
    case LOAD_FILE:
      return {
        ...initState,
        ...action.payload
      }
    case SET_CUR_SHAPE:
      return {
        ...state,
        curShape: action.payload
      }
    case ADD_TEXT:
      return {
        ...state,
        text: [...state.text, action.payload]
      }
    case UPDATE_TEXT:
      const newText = [...state.text];
      for (let i in newText) {
        if (newText[i].id === action.payload.id) {
          if (action.payload.position) {
            newText[i].position = action.payload.position;
          }
          if (action.payload.value) {
            newText[i].value = action.payload.value;
          }
          break; // Stop the loop
        }
      }
      return {
        ...state,
        text: newText
      }
    case DELETE_TEXT:
      return {
        ...state,
        text: state.text.filter(el => el.id !== action.payload)
      }
    case DELETE_OBJECT:
      return {
        ...state,
        objects: state.objects.filter(el => el.id !== action.payload)
      }
    case UPDATE_OBJECT:
      const newObjects = state.objects;
      for (let i in newObjects) {
        if (newObjects[i].id === action.payload.id) {
          newObjects[i].position = action.payload.position;
          break; // Stop the loop
        }
      }
      return {
        ...state,
        objects: newObjects
      }
    case ADD_OBJECT:
      return {
        ...state,
        objects: [...state.objects, action.payload]
      }
    case SET_ANCHOR:
      const newAnchors = initializeSheet();
      if (action.payload) {
        newAnchors[action.payload.x][action.payload.y] = true;
      }
      return {
        ...state,
        data: {
          ...state.data,
          anchors: newAnchors
        },
        anchor: action.payload
      }
    case UPDATE_EDGES:
      const newEdges = initializeSheet();
      action.payload.forEach(edgePosition => {
        newEdges[edgePosition.x][edgePosition.y] = true;
      });
      return {
        ...state,
        data: {
          ...state.data,
          edges: newEdges
        }
      }
    case UPDATE_WALLS:
      const newWalls = [...state.walls];
      action.payload.forEach(wallPosition => {
        newWalls[wallPosition.x][wallPosition.y] = true;
      });
      return {
        ...state,
        walls: newWalls,
        data: {
          ...state.data,
          edges: initializeSheet(),
        }
      }
    case DELETE_WALLS:
      const newWalls1 = [...state.walls];
      for (let r = 0; r < state.data.selected.length; r++) {
        for (let c = 0; c < state.data.selected[0].length; c++) {
          if (state.data.selected[r][c]) { newWalls1[r][c] = false; }
        }
      }
      return {
        ...state,
        anchor: null,
        walls: newWalls1,
        data: {
          ...state.data,
          selected: initializeSheet(),
        }
      }
    case CREATE_WALLS:
      const newWalls2 = [...state.walls];
      for (let r = 0; r < state.data.selected.length; r++) {
        for (let c = 0; c < state.data.selected[0].length; c++) {
          if (state.data.selected[r][c]) { newWalls2[r][c] = true; }
        }
      }
      return {
        ...state,
        anchor: null,
        walls: newWalls2,
        data: {
          ...state.data,
          selected: initializeSheet(),
        }
      }
    case SET_WALL:
      const newWalls3 = [...state.walls];
      newWalls3[action.payload.row][action.payload.col] = action.payload.value;
      return {
        ...state,
        walls: newWalls3
      }
    case UPDATE_SELECTED:
      const newSelected = initializeSheet();
      action.payload.forEach(selPosition => {
        newSelected[selPosition.x][selPosition.y] = true;
      });
      return {
        ...state,
        data: {
          ...state.data,
          selected: newSelected
        }
      }
    default:
      return state;
  }
}

export default sheetReducer;