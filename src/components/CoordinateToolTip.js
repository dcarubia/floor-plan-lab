import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setMouseDown } from '../actions/cursorActions'

const useStyles = makeStyles({
  paper: {
    padding: '6px 12px 6px 12px',
    position: 'absolute',
    bottom: 0,
    left: 64,
  },
});

function CoordinateToolTip() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cursorPosition = useSelector(state => state.cursor.position);

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

  return (
    <Paper className={classes.paper}>
      {cursorPosition ? 'row: ' + cursorPosition.x + ', col: ' + cursorPosition.y : null}
    </Paper>
  );
}

export default CoordinateToolTip;