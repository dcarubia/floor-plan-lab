import React from 'react';
import { useSelector } from 'react-redux';
import { Fab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    padding: '6px 12px 6px 12px',
    position: 'absolute',
    bottom: 0,
    left: 64,
  },
});

function CoordinateToolTip() {
  const classes = useStyles();
  const cursorPosition = useSelector(state => state.cursor.position);

  return (
    <Paper className={classes.paper}>
      {cursorPosition ? 'row: ' + cursorPosition.x + ', col: ' + cursorPosition.y : null}
    </Paper>
  );
}

export default CoordinateToolTip;