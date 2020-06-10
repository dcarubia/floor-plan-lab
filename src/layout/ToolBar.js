import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Tooltip } from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.css';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { setTool } from '../actions/toolActions';
import { setAnchor, updateEdges, setCurShape, updateSelected } from '../actions/sheetActions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  toolBarContainer: {
    width: 54,
    backgroundColor: '#5d6e7c',
    height: 'calc(100vh - 64px)',
    borderTop: '0px solid #000',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    padding: '16px 0px 16px 0px',
    minWidth: 54,
    marginTop: 2,
    '&:hover': {
      backgroundColor: '#43505b',
    }
  },
  activeButton: {
    color: '#fff',
    fontSize: 20,
    minWidth: 54,
    marginTop: 2,
    padding: '16px 0px 16px 0px',
    '&:hover': {
      backgroundColor: '#43505b',
    },
    backgroundColor: '#43505b'
  },
  toolTip: {
    fontSize: 14,
  }
});

function ToolBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentTool = useSelector(state => state.tool.current);

  const onClick = toolName => {
    dispatch(setTool(toolName));
    dispatch(setAnchor(null));
    dispatch(setCurShape(null));
    dispatch(updateEdges([]));
    dispatch(updateSelected([]));
  }

  return (
    <div className={classes.toolBarContainer}>
      <Tooltip title={<span className={classes.toolTip}>Select</span>} placement='right' arrow>
        <Button size='small'
          onClick={() => onClick('SELECT')}
          className={currentTool === 'SELECT' ? classes.activeButton : classes.button}
        >
          <span className="fas fa-mouse-pointer"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Draw</span>} placement='right' arrow>
        <Button size='small'
          onClick={() => onClick('DRAW')}
          className={currentTool === 'DRAW' ? classes.activeButton : classes.button}
        >
          <span className="fas fa-pen"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Erase</span>} placement='right' arrow>
        <Button size='small'
          onClick={() => onClick('ERASE')}
          className={currentTool === 'ERASE' ? classes.activeButton : classes.button}
        >
          <span className="fas fa-eraser"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Line</span>} placement='right' arrow>
        <Button size='small'
          onClick={() => onClick('LINE')}
          className={currentTool === 'LINE' ? classes.activeButton : classes.button}
        >
          <LinearScaleIcon />
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Rectangle</span>} placement='right' arrow>
        <Button size='small'
          onClick={() => onClick('RECTANGLE')}
          className={currentTool === 'RECTANGLE' ? classes.activeButton : classes.button}
        >
          <span className="fas fa-vector-square"></span>
        </Button>
      </Tooltip>

    </div>
  );
}

export default ToolBar;