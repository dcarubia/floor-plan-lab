import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setMouseDown } from '../actions/cursorActions';
import Draggable from 'react-draggable';

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#fff',
    padding: '6px 12px 6px 12px',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

function TextBox() {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: 0, y: 0 }}
      grid={[23, 23]}
      scale={1}>
      <div className={classes.paper} style={{ zIndex: 1 }}>
        Drag Me
      </div>
    </Draggable>

  );
}

export default TextBox;