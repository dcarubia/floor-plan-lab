import React, { useState, useRef } from 'react';
import { Grid, Typography, TextField, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch } from 'react-redux';
import { deleteText } from '../actions/sheetActions';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fafafa',
    padding: '9px 12px 0px 0px',
    position: 'absolute',
    height: 36,
    top: 23 * 2,
    left: 23 * 2,
  },
  iconButton: {
    padding: '2px 2px 0px 2px',
    marginLeft: 6,
    '&:hover': {
      backgroundColor: '#eee'
    }
  }
});

function TextBox({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(true);
  const [textValue, setTextValue] = useState('');
  const containerRef = useRef();

  const handleChange = e => {
    setTextValue(e.target.value);
  }

  const handleMouseDown = e => {
    if (!containerRef.current.contains(e.target)) {
      setEditMode(false);
    }
  }

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleMouseDown, false);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleMouseDown, false);
    };
  }, []);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setEditMode(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteText(id))
  }

  const isEditMode = () => {
    setEditMode(true);
  }

  return (
    <Draggable
      handle='.handle'
      bounds="parent"
      grid={[23, 23]}
      scale={1}
    >

      <div className={classes.root} ref={containerRef}>
        <Grid container>
          <Grid item>
            {editMode ?
              <div className='handle'>
                <DragIndicatorIcon style={{ paddingRight: 4, color: '#aaa' }} />
              </div> : <div style={{ paddingRight: 12 }}></div>}
          </Grid>

          <Grid item>
            {editMode ?
              <div>
                <Grid container>
                  <Grid item>
                    <TextField
                      value={textValue}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      size="small"
                      placeholder='Label Text'
                      style={{ width: 143 }}
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip title='Save'>
                      <div className={classes.iconButton} onClick={() => setEditMode(false)}>
                        <DoneIcon style={{ color: '#2ca01c' }} />
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title='Delete'>
                      <div className={classes.iconButton} onClick={handleDelete}>
                        <CloseIcon style={{ color: '#ff0000' }} />
                      </div>
                    </Tooltip>
                  </Grid>
                </Grid>
              </div>
              :
              <div onClick={isEditMode} style={{ minHeight: 32, minWidth: 28 }}>
                <Typography variant='body1' >
                  {textValue}
                </Typography>
              </div>

            }
          </Grid>


        </Grid>
      </div>

    </Draggable>

  );
}

export default TextBox;