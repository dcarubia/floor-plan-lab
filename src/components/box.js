import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { setCursorPosition } from '../actions/cursorActions';
import { useSelector, useDispatch } from 'react-redux';
import { getState } from '../index';

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
  const [isWall, setIsWall] = React.useState(boxProps.isWall);

  const getMouseDown = () => {
    return getState().cursor.mouseDown;
  }

  const getCurrentTool = () => {
    return getState().tool.current;
  }

  React.useEffect(() => {
    if (!isPositionOutside) {
      dispatch(setCursorPosition({ x: boxProps.row + 1, y: boxProps.col + 1 }))
      if (getMouseDown()) {
        const currentTool = getCurrentTool();
        if (currentTool === 'DRAW') {
          setIsWall(true);
        }
        if (currentTool === 'ERASE') {
          setIsWall(false);
        }
      }
    }
    setPositionOutside(isPositionOutside)
  }, [isPositionOutside, boxProps.row, boxProps.col, dispatch])

  const onMouseDown = () => {
    const currentTool = getCurrentTool();
    if (currentTool === 'DRAW') {
      setIsWall(true);
    } else if (currentTool === 'ERASE') {
      setIsWall(false);
    }
  }

  return (
    <div className={classes.root} style={
      isWall ? {
        backgroundColor: '#000',
        borderRight: '1px solid #000',
        borderBottom: '1px solid #000',
      }

        : positionOutside ? {
          borderRight: '1px solid #becddb',
          borderBottom: '1px solid #becddb',
        }

          : {
            backgroundColor: '#ccdcea',
            borderRight: '1px solid #becddb',
            borderBottom: '1px solid #becddb',
          }
    }
      onMouseDown={onMouseDown}
    >
    </div>
  );
}

export default Box;