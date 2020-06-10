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
  SET_SCALE
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

const initState = {
  scale: {
    ft: 1,
    in: 0
  },
  curShape: null,
  text: [],
  anchor: null,
  data: {
    anchors: initializeSheet(),
    walls: initializeSheet(),
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
    case DELETE_TEXT:
      return {
        ...state,
        text: state.text.filter(el => el !== action.payload)
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
          walls: initializeSheet(),
          edges: newEdges
        }
      }
    case UPDATE_WALLS:
      const newWalls = initializeSheet();
      action.payload.forEach(wallPosition => {
        newWalls[wallPosition.x][wallPosition.y] = true;
      });
      return {
        ...state,
        data: {
          ...state.data,
          edges: initializeSheet(),
          walls: newWalls
        }
      }
    case DELETE_WALLS:
      const newWalls1 = [];
      for (let r = 0; r < state.data.selected.length; r++) {
        const row = [];
        for (let c = 0; c < state.data.selected[0].length; c++) {
          if (state.data.selected[r][c]) { row.push(false); }
          else { row.push(null); }
        }
        newWalls1.push(row);
      }
      return {
        ...state,
        anchor: null,
        data: {
          ...state.data,
          selected: initializeSheet(),
          walls: newWalls1
        }
      }
    case CREATE_WALLS:
      const newWalls2 = state.data.selected;
      return {
        ...state,
        anchor: null,
        data: {
          ...state.data,
          selected: initializeSheet(),
          walls: newWalls2
        }
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