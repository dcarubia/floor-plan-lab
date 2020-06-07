import { SET_ANCHOR, UPDATE_EDGES, UPDATE_WALLS } from '../actions/types';

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
  anchor: null,
  data: {
    anchors: initializeSheet(),
    walls: initializeSheet(),
    edges: initializeSheet(),
  }
}

const toolReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ANCHOR:
      const newAnchors = initializeSheet();
      if (action.payload) {
        newAnchors[action.payload.x][action.payload.y] = true;
      }
      return {
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
      const newWalls = initializeSheet();
      action.payload.forEach(wallPosition => {
        newWalls[wallPosition.x][wallPosition.y] = true;
      });
      return {
        ...state,
        data: {
          ...state.data,
          walls: newWalls
        }
      }
    default:
      return state;
  }
}

export default toolReducer;