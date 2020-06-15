import React, { useState, useRef } from 'react';
import { Grid, Typography, TextField, Tooltip, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch, useSelector } from 'react-redux';
import { deleteText, setAnchor, deleteObject } from '../actions/sheetActions';
import { boxSize } from '../config';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import FlipIcon from '@material-ui/icons/Flip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  getObjectSize,
  SINGLE_DOOR,
  DOUBLE_DOOR,
  SLIDING_DOOR,
  POCKET_DOOR,
  BIFOLD_DOOR
} from './objectInfo';
import singleDoor from '../images/objects/singleDoor.png';
import singleDoor90 from '../images/objects/singleDoor90.png';
import singleDoor180 from '../images/objects/singleDoor180.png';
import singleDoor270 from '../images/objects/singleDoor270.png';
import doubleDoor from '../images/objects/doubleDoor.png';
import doubleDoor90 from '../images/objects/doubleDoor90.png';
import doubleDoor180 from '../images/objects/doubleDoor180.png';
import doubleDoor270 from '../images/objects/doubleDoor270.png';
import slidingDoor from '../images/objects/slidingDoor.png';
import slidingDoor90 from '../images/objects/slidingDoor90.png';
import slidingDoor180 from '../images/objects/slidingDoor180.png';
import slidingDoor270 from '../images/objects/slidingDoor270.png';
import pocketDoor from '../images/objects/pocketDoor.png';
import pocketDoor90 from '../images/objects/pocketDoor90.png';
import pocketDoor180 from '../images/objects/pocketDoor180.png';
import pocketDoor270 from '../images/objects/pocketDoor270.png';
import bifoldDoor from '../images/objects/bifoldDoor.png';
import bifoldDoor90 from '../images/objects/bifoldDoor90.png';
import bifoldDoor180 from '../images/objects/bifoldDoor180.png';
import bifoldDoor270 from '../images/objects/bifoldDoor270.png';


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: (boxSize + 1) * 2,
    left: (boxSize + 1) * 2,
  },
  editBar: {
    position: 'fixed',
    top: 84,
    right: 20,
    padding: 0,
  },
  button: {
    padding: 12,
    minWidth: 24,
  }
});

function ObjectEl({ id, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(true);
  const [imgRotation, setImgRotation] = useState(0);
  const [imgDirection, setImgDirection] = useState(1);
  const scale = useSelector(state => state.sheet.scale);
  const containerRef = useRef();
  const editBarRef = useRef();


  const handleMouseDown = e => {
    if (!containerRef.current.contains(e.target) &&
      editBarRef.current && !editBarRef.current.contains(e.target)) {
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

  const rotateLeft = () => {
    switch (imgRotation) {
      case 0:
        setImgRotation(270);
        break;
      case 90:
        setImgRotation(0);
        break;
      case 180:
        setImgRotation(90);
        break;
      default:
        setImgRotation(180);
    }
  }

  const rotateRight = () => {
    switch (imgRotation) {
      case 0:
        setImgRotation(90);
        break;
      case 90:
        setImgRotation(180);
        break;
      case 180:
        setImgRotation(270);
        break;
      default:
        setImgRotation(0);
    }
  }

  const flipImg = () => {
    if (imgDirection === 1) {
      setImgDirection(-1);
    } else {
      setImgDirection(1);
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setEditMode(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteObject(id))
  }

  const isEditMode = () => {
    setEditMode(true);
  }

  const getImageWidth = (objectType) => {
    const objectWidth = getObjectSize(objectType).w;
    const scaleInches = scale.ft * 12 + scale.in;
    return Math.max((boxSize + 1) * Math.round(objectWidth / scaleInches), boxSize + 1);
  }

  const getImageHeight = (objectType) => {
    const objectHeight = getObjectSize(objectType).h;
    const scaleInches = scale.ft * 12 + scale.in;
    return Math.max((boxSize + 1) * Math.round(objectHeight / scaleInches), boxSize + 1);
  }

  const getImageSrc = (objectType) => {
    switch (objectType) {
      case SINGLE_DOOR:
        return (imgRotation === 0 ? singleDoor :
          imgRotation === 90 ? singleDoor90 :
            imgRotation === 180 ? singleDoor180 : singleDoor270);
      case DOUBLE_DOOR:
        return (imgRotation === 0 ? doubleDoor :
          imgRotation === 90 ? doubleDoor90 :
            imgRotation === 180 ? doubleDoor180 : doubleDoor270);
      case SLIDING_DOOR:
        return (imgRotation === 0 ? slidingDoor :
          imgRotation === 90 ? slidingDoor90 :
            imgRotation === 180 ? slidingDoor180 : slidingDoor270);
      case POCKET_DOOR:
        return (imgRotation === 0 ? pocketDoor :
          imgRotation === 90 ? pocketDoor90 :
            imgRotation === 180 ? pocketDoor180 : pocketDoor270);
      case BIFOLD_DOOR:
        return (imgRotation === 0 ? bifoldDoor :
          imgRotation === 90 ? bifoldDoor90 :
            imgRotation === 180 ? bifoldDoor180 : bifoldDoor270);
      default:
        return singleDoor;
    }
  }

  return (
    <>
      <Draggable
        bounds="parent"
        grid={[(boxSize + 1), (boxSize + 1)]}
        scale={1}
      >

        <div className={classes.root} ref={containerRef} onClick={isEditMode} style={
          editMode ? { border: '1px solid #4281ff' } : {}}>
          <img
            src={getImageSrc(type)}
            height={imgRotation === 90 || imgRotation === 270 ? getImageWidth(type) : getImageHeight(type)}
            width={imgRotation === 90 || imgRotation === 270 ? getImageHeight(type) : getImageWidth(type)}
            style={{
              imageRendering: 'pixelated',
              WebkitTransform: `scaleX(${imgDirection})`,
              transform: `scaleX(${imgDirection})`,
              userDrag: 'none',
              userSelect: 'none',
              MozUserSelect: 'none',
              WebkitUserDrag: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none'
            }}
          />
        </div>
      </Draggable>

      {
        editMode ?
          <Paper className={classes.editBar} ref={editBarRef}>
            <Tooltip title='Rotate Left' placement='bottom'>
              <Button onClick={rotateLeft} className={classes.button}>
                <RotateLeftIcon />
              </Button>
            </Tooltip>

            <Tooltip title='Rotate Right' placement='bottom'>
              <Button onClick={rotateRight} className={classes.button}>
                <RotateRightIcon />
              </Button>
            </Tooltip>

            <Tooltip title='Flip Object' placement='bottom'>
              <Button onClick={flipImg} className={classes.button}>
                <FlipIcon />
              </Button>
            </Tooltip>

            <Tooltip title='Delete Object' placement='bottom'>
              <Button onClick={handleDelete} className={classes.button} style={{ color: '#bc0000' }}>
                <DeleteOutlineIcon />
              </Button>
            </Tooltip>

          </Paper> : null
      }
    </>
  );
}

export default ObjectEl;