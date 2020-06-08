import { SET_ANCHOR, UPDATE_EDGES, UPDATE_WALLS, ADD_TEXT, DELETE_TEXT, SET_CUR_SHAPE } from '../actions/types';

const initializeSheet = () => {
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
  scale: 1.0,
  curShape: null,
  text: [],
  anchor: null,
  data: {
    anchors: initializeSheet(),
    walls: initializeSheet(),
    edges: initializeSheet(),
  }
}

const sheetReducer = (state = initState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default sheetReducer;