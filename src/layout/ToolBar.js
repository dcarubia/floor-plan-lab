import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Tooltip } from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.css';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

const useStyles = makeStyles({
  toolBarContainer: {
    width: 64,
    backgroundColor: '#43505b',
    height: 'calc(100vh - 56px)',
    borderTop: '0px solid #000',
    paddingTop: 8
  },
  button: {
    color: '#fff',
    fontSize: 20,
    padding: '16px 0px 16px 0px',
    '&:hover': {
      background: '#5d6e7c',
    }
  },
  toolTip: {
    fontSize: 14,
  }
});

function ToolBar() {
  const classes = useStyles();

  return (
    <div className={classes.toolBarContainer}>
      <Tooltip title={<span className={classes.toolTip}>Select</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-mouse-pointer"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Draw</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-pen"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Line</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <LinearScaleIcon />
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Square</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-vector-square"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Erase</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-eraser"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Text</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-font"></span>
        </Button>
      </Tooltip>

      <Tooltip title={<span className={classes.toolTip}>Measure</span>} placement='right' arrow>
        <Button size='small' className={classes.button}>
          <span className="fas fa-ruler"></span>
        </Button>
      </Tooltip>

    </div>
  );
}

export default ToolBar;