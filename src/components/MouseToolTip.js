import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setMouseDown } from '../actions/cursorActions';
import MouseTooltip from 'react-sticky-mouse-tooltip';

const useStyles = makeStyles({
  paper: {
    padding: '6px 12px 6px 12px',
    position: 'absolute',
    bottom: 0,
    left: 64,
  },
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

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const getFeet = (len) => {
    return Math.floor(len);
  }

  const getInches = (len) => {
    return (len % Math.floor(len)) * 12;
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
            <span>{shape.type === 'LINE' ?
              getFeet(shape.len) + '\'' + getInches(shape.len) + '\"'
              :
              getFeet(shape.width) + '\'' + getInches(shape.width) + '\" x ' +
              getFeet(shape.height) + '\'' + getInches(shape.height) + '\", Interior: ' +
              shape.area + ' sqft'
            }</span>
          </MouseTooltip >
          : null
      }
    </>
  );
}

export default MouseToolTip;