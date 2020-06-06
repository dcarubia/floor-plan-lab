import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { setCursorPosition } from '../actions/cursorActions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    padding: 0,
    height: 22,
    width: 22,
  }
});

function Box({ isPositionOutside, boxProps }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [positionOutside, setPositionOutside] = React.useState(isPositionOutside);

  React.useEffect(() => {
    if (!isPositionOutside) {
      dispatch(setCursorPosition({ x: boxProps.row + 1, y: boxProps.col + 1 }))
    }
    setPositionOutside(isPositionOutside)
  }, [isPositionOutside, boxProps.row, boxProps.col, dispatch])

  return (
    <div className={classes.root} style={
      positionOutside ?
        {
          borderRight: '1px solid #becddb',
          borderBottom: '1px solid #becddb',
        }
        :
        {
          backgroundColor: '#ccdcea',
          borderRight: '1px solid #becddb',
          borderBottom: '1px solid #becddb',
        }
    }>
    </div>
  );
}

export default Box;