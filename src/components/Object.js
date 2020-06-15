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
  BIFOLD_DOOR,
  WINDOW_32,
  WINDOW_48,
  WINDOW_60,
  COUNTER_MIDDLE,
  COUNTER_CORNER,
  COUNTER_END,
  COOK_TOP,
  DISHWASHER,
  SINK,
  DOUBLE_SINK,
  OVEN,
  REFRIGERATOR,
  WASHER,
  DRYER
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
import window from '../images/objects/window.png';
import window90 from '../images/objects/window90.png';
import window180 from '../images/objects/window180.png';
import window270 from '../images/objects/window270.png';
import counterMiddle from '../images/objects/counterMiddle.png';
import counterMiddle90 from '../images/objects/counterMiddle90.png';
import counterMiddle180 from '../images/objects/counterMiddle180.png';
import counterMiddle270 from '../images/objects/counterMiddle270.png';
import cookTop from '../images/objects/cookTop.png';
import counterCorner from '../images/objects/counterCorner.png';
import counterEnd from '../images/objects/counterEnd.png';
import counterEnd90 from '../images/objects/counterEnd90.png';
import counterEnd180 from '../images/objects/counterEnd180.png';
import counterEnd270 from '../images/objects/counterEnd270.png';
import dishwasher from '../images/objects/dishwasher.png';
import doubleSink from '../images/objects/doubleSink.png';
import doubleSink90 from '../images/objects/doubleSink90.png';
import doubleSink180 from '../images/objects/doubleSink180.png';
import doubleSink270 from '../images/objects/doubleSink270.png';
import dryer from '../images/objects/dryer.png';
import oven from '../images/objects/oven.png';
import refrigerator from '../images/objects/refrigerator.png';
import sink from '../images/objects/sink.png';
import sink90 from '../images/objects/sink90.png';
import sink180 from '../images/objects/sink180.png';
import sink270 from '../images/objects/sink270.png';
import washer from '../images/objects/washer.png';


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
      case WINDOW_32:
      case WINDOW_48:
      case WINDOW_60:
        return (imgRotation === 0 ? window :
          imgRotation === 90 ? window90 :
            imgRotation === 180 ? window180 : window270);
      case COOK_TOP:
        return (imgRotation === 0 ? cookTop :
          imgRotation === 90 ? cookTop :
            imgRotation === 180 ? cookTop : cookTop);
      case COUNTER_CORNER:
        return (imgRotation === 0 ? counterCorner :
          imgRotation === 90 ? counterCorner :
            imgRotation === 180 ? counterCorner : counterCorner);
      case COUNTER_END:
        return (imgRotation === 0 ? counterEnd :
          imgRotation === 90 ? counterEnd90 :
            imgRotation === 180 ? counterEnd180 : counterEnd270);
      case COUNTER_MIDDLE:
        return (imgRotation === 0 ? counterMiddle :
          imgRotation === 90 ? counterMiddle90 :
            imgRotation === 180 ? counterMiddle180 : counterMiddle270);
      case DISHWASHER:
        return (imgRotation === 0 ? dishwasher :
          imgRotation === 90 ? dishwasher :
            imgRotation === 180 ? dishwasher : dishwasher);
      case DOUBLE_SINK:
        return (imgRotation === 0 ? doubleSink :
          imgRotation === 90 ? doubleSink90 :
            imgRotation === 180 ? doubleSink180 : doubleSink270);
      case DRYER:
        return (imgRotation === 0 ? dryer :
          imgRotation === 90 ? dryer :
            imgRotation === 180 ? dryer : dryer);
      case OVEN:
        return (imgRotation === 0 ? oven :
          imgRotation === 90 ? oven :
            imgRotation === 180 ? oven : oven);
      case REFRIGERATOR:
        return (imgRotation === 0 ? refrigerator :
          imgRotation === 90 ? refrigerator :
            imgRotation === 180 ? refrigerator : refrigerator);
      case SINK:
        return (imgRotation === 0 ? sink :
          imgRotation === 90 ? sink90 :
            imgRotation === 180 ? sink180 : sink270);
      case WASHER:
        return (imgRotation === 0 ? washer :
          imgRotation === 90 ? washer :
            imgRotation === 180 ? washer : washer);
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