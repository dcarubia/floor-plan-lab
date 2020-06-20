import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setMouseDown } from '../actions/cursorActions';
import { deleteWalls, createWalls, setAnchor, updateEdges, setCurShape, updateSelected } from '../actions/sheetActions';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import { getState } from '../index';

const useStyles = makeStyles({
  container: {
    padding: 4,
    backgroundColor: '#fff'
  },
  p: {
    margin: 0,
    padding: '0px 0px 8px 0px'
  }
});

function MouseToolTip() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const shape = useSelector(state => state.sheet.curShape);

  const handleMouseDown = () => {
    dispatch(setMouseDown(true));
  }

  const handleMouseUp = () => {
    dispatch(setMouseDown(false));
  }

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      dispatch(setAnchor(null));
      dispatch(setCurShape(null));
      dispatch(updateEdges([]));
      dispatch(updateSelected([]));
    }
    else if (getState().tool.current === 'SELECT') {
      if (event.which === 8) {
        // backspace
        dispatch(deleteWalls());
      } else if (event.which === 87) {
        // key w (wall)
        dispatch(createWalls());
      }
    }
  }

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getFeet = (len) => {
    return Math.floor(len / 12);
  }

  const getInches = (len) => {
    return len % 12;
  }

  return (
    <>
      {
        shape ?
          <MouseTooltip
            visible={true}
            offsetX={15}
            offsetY={10}
          >
            <div className={classes.container}>
              {shape.type === 'LINE' ?
                <span>
                  <strong>
                    {getFeet(shape.len) + '\'' + getInches(shape.len) + '\"'}
                  </strong>
                </span>
                :
                <div>
                  <p className={classes.p}>
                    <span>
                      {'w: '}
                      <strong>{getFeet(shape.width) + '\'' + getInches(shape.width) + '\"'}</strong>
                      {', h: '}
                      <strong>{getFeet(shape.height) + '\'' + getInches(shape.height) + '\"'}</strong>
                    </span>
                  </p>
                  <p className={classes.p}>
                    <span>
                      {'Area (inside): '} <strong>{shape.area}</strong> {' sqft'}
                    </span>
                  </p>
                </div>
              }
            </div>
          </MouseTooltip >
          : null
      }
    </>
  );
}

export default MouseToolTip;