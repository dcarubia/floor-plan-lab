import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem, Paper, Modal, Tabs, Tab, ButtonGroup } from '@material-ui/core';
import { addText, addObject } from '../actions/sheetActions';
import { setAnchor, updateEdges, setCurShape, updateSelected, setNewFile } from '../actions/sheetActions';
import { setTool } from '../actions/toolActions';
import { useDispatch } from 'react-redux';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall';
import logo from '../images/logo.png';
import { getObjectSize } from '../components/objectInfo';
import singleDoor from '../images/objects/singleDoor.png';
import doubleDoor from '../images/objects/doubleDoor.png';
import slidingDoor from '../images/objects/slidingDoor.png';
import pocketDoor from '../images/objects/pocketDoor.png';
import bifoldDoor from '../images/objects/bifoldDoor.png';
import window from '../images/objects/window.png';
import counterMiddle from '../images/objects/counterMiddle.png';
import cookTop from '../images/objects/cookTop.png';
import counterCorner from '../images/objects/counterCorner.png';
import counterEnd from '../images/objects/counterEnd.png';
import dishwasher from '../images/objects/dishwasher.png';
import doubleSink from '../images/objects/doubleSink.png';
import dryer from '../images/objects/dryer.png';
import oven from '../images/objects/oven.png';
import refrigerator from '../images/objects/refrigerator.png';
import sink from '../images/objects/sink.png';
import washer from '../images/objects/washer.png';
import bath from '../images/objects/bath.png';
import bathroomSink from '../images/objects/bathroomSink.png';
import showerRect from '../images/objects/showerRect.png';
import showerSquare from '../images/objects/showerSquare.png';
import toilet from '../images/objects/toilet.png';
import chair from '../images/objects/chair.png';
import coffeeTable from '../images/objects/coffeeTable.png';
import endTable from '../images/objects/endTable.png';
import sofa from '../images/objects/sofa.png';
import loveSeat from '../images/objects/loveSeat.png';
import tableRound from '../images/objects/tableRound.png';
import tableRect from '../images/objects/tableRect.png';
import queenBed from '../images/objects/queenBed.png';
import twinBed from '../images/objects/twinBed.png';
import changeScaleGif from '../images/tutorial/changeScale2.gif';
import selectToolGif from '../images/tutorial/selectTool.gif';
import moveToolGif from '../images/tutorial/moveTool.gif';
import lineToolGif from '../images/tutorial/lineTool.gif';
import drawToolGif from '../images/tutorial/drawTool.gif';
import eraseToolGif from '../images/tutorial/eraseTool.gif';
import placeObjectGif from '../images/tutorial/placeObject.gif';
import placeTextGif from '../images/tutorial/placeText.gif';
import rectWallGif from '../images/tutorial/rectWall.gif';
import plan1 from '../images/tutorial/Plan1.png';

const useStyles = makeStyles({
  appBarContainer: {
    padding: '0px 24px 0px 20px',
    color: '#fff',
    background: '#24292E',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    height: 64,
    borderBottom: '1px solid #000'
  },
  button: {
    marginTop: 12,
    color: '#fff',
    background: '#43505b',
    '&:hover': {
      background: '#5d6e7c',
    }
  },
  menuButton: {
    color: '#f0f0f0',
    minWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      background: '#43505b',
    },
    marginRight: 8
  },
  justifyRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menuItem: {
    minWidth: 150
  },
  paper: {
    position: 'absolute',
    outline: 0,
    height: 680,
    top: 60,
    left: 200,
  },
  warningPaper: {
    position: 'absolute',
    outline: 0,
    width: 400,
    top: 'calc(50vh - 150px)',
    left: 'calc(50vw - 200px)',
  },
  tutorialPaper: {
    position: 'absolute',
    outline: 0,
    width: 1000,
    top: 'calc(50vh - 300px)',
    left: 'calc(50vw - 500px)',
  },
  modalContent: {
    maxWidth: 480,
    height: 'calc(100vh - 64px - 32px)',
    overflowY: 'scroll',
    padding: 24,
  },
  imageContainer: {
    display: 'inline-block',
    width: 150,
    padding: '8px 24px 8px 24px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    }
  },
  image: {
    paddingBottom: 8
  },
  gif: {
    maxHeight: 390
  }
});

const objects = {
  doors: [
    {
      id: 'SINGLE_DOOR',
      file: singleDoor,
      label: 'Single Door - 32"'
    },
    {
      id: 'DOUBLE_DOOR',
      file: doubleDoor,
      label: 'Double Door - 64"'
    },
    {
      id: 'SLIDING_DOOR',
      file: slidingDoor,
      label: 'Sliding Door - 64"'
    },
    {
      id: 'POCKET_DOOR',
      file: pocketDoor,
      label: 'Pocket Door - 64"'
    },
    {
      id: 'BIFOLD_DOOR',
      file: bifoldDoor,
      label: 'Bi-fold Door - 60"'
    },
  ],
  windows: [
    {
      id: 'WINDOW_32',
      file: window,
      label: 'Window - 32"'
    },
    {
      id: 'WINDOW_48',
      file: window,
      label: 'Window - 48"'
    },
    {
      id: 'WINDOW_60',
      file: window,
      label: 'Window - 60"'
    },
  ],
  kitchen: [
    {
      id: 'COUNTER_END',
      file: counterEnd,
      label: 'Counter End - 24"'
    },
    {
      id: 'COUNTER_MIDDLE',
      file: counterMiddle,
      label: 'Counter Middle - 24"'
    },
    {
      id: 'COUNTER_CORNER',
      file: counterCorner,
      label: 'Counter Corner - 24"'
    },
    {
      id: 'COOK_TOP',
      file: cookTop,
      label: 'Cook Top - 24"'
    },
    {
      id: 'DISHWASHER',
      file: dishwasher,
      label: 'Dishwasher - 24"'
    },
    {
      id: 'SINK',
      file: sink,
      label: 'Sink - 24"'
    },
    {
      id: 'DOUBLE_SINK',
      file: doubleSink,
      label: 'Double Sink - 24"'
    },
    {
      id: 'REFRIGERATOR',
      file: refrigerator,
      label: 'Refrigerator - 24"'
    },
    {
      id: 'OVEN',
      file: oven,
      label: 'Oven - 24"'
    },
  ],
  bathroom: [
    {
      id: 'BR_SINK',
      file: bathroomSink,
      label: 'Bathroom Sink - 24"'
    },
    {
      id: 'BATH',
      file: bath,
      label: 'Bath - 60"'
    },
    {
      id: 'SHOWER_RECT',
      file: showerRect,
      label: 'Shower Rect. - 60"'
    },
    {
      id: 'SHOWER_SQUARE',
      file: showerSquare,
      label: 'Shower Square - 32"'
    },
    {
      id: 'TOILET',
      file: toilet,
      label: 'Toilet - 30"'
    },
  ],
  livingRoom: [
    {
      id: 'CHAIR',
      file: chair,
      label: 'Chair - 35"'
    },
    {
      id: 'LOVESEAT',
      file: loveSeat,
      label: 'Loveseat - 58"'
    },
    {
      id: 'SOFA',
      file: sofa,
      label: 'Sofa - 84"'
    },
    {
      id: 'COFFEE_TABLE',
      file: coffeeTable,
      label: 'Coffee Table - 40"'
    },
    {
      id: 'END_TABLE',
      file: endTable,
      label: 'End Table - 18"'
    },
  ],
  diningRoom: [
    {
      id: 'TABLE_ROUND',
      file: tableRound,
      label: 'Round Table - 36"'
    },
    {
      id: 'TABLE_RECT',
      file: tableRect,
      label: 'Rectangular Table - 48"'
    },
  ],
  bedroom: [
    {
      id: 'QUEEN_BED',
      file: queenBed,
      label: 'Queen Bed - 60"x80"'
    },
    {
      id: 'TWIN_BED',
      file: twinBed,
      label: 'Twin Bed - 38"x75"'
    },
    {
      id: 'END_TABLE',
      file: endTable,
      label: 'End Table - 18"'
    },
  ],
  laundry: [
    {
      id: 'WASHER',
      file: washer,
      label: 'Washer - 27"'
    },
    {
      id: 'DRYER',
      file: dryer,
      label: 'Dryer - 27"'
    },
  ],
  stairs: [

  ],
}

function AppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [textboxAnchor, setTextboxAnchor] = React.useState(null);
  const [fileAnchor, setFileAnchor] = React.useState(null);
  const [objectModalOpen, setObjectModalOpen] = React.useState(false);
  const [warningModalOpen, setWarningModalOpen] = React.useState(false);
  const [tutorialModalOpen, setTutorialModalOpen] = React.useState(true);
  const [curTab, setCurTab] = React.useState(0);
  const [tutorialTab, setTutorialTab] = React.useState(1);
  const [toolbarTab, setToolbarTab] = React.useState(0);


  const handleClickTextbox = (event) => {
    setTextboxAnchor(event.currentTarget);
  };

  const handleClickFile = (event) => {
    setFileAnchor(event.currentTarget);
  };

  const handleCloseTextbox = () => {
    setTextboxAnchor(null);
  };

  const handleCloseFile = () => {
    setFileAnchor(null);
  };

  const insertLabel = () => {
    dispatch(addText('label'));
    handleCloseTextbox();
  }

  const newFile = () => {
    dispatch(setNewFile());
    handleWarningModalClose();
  }

  const handleObjectModalClose = () => {
    setObjectModalOpen(false);
  };

  const handleTutorialModalClose = () => {
    setTutorialModalOpen(false);
  };

  const handleWarningModalClose = () => {
    setWarningModalOpen(false);
    handleCloseFile();
  };

  const openObjectModal = () => {
    dispatch(setTool('POINTER'));
    dispatch(setAnchor(null));
    dispatch(setCurShape(null));
    dispatch(updateEdges([]));
    dispatch(updateSelected([]));
    setObjectModalOpen(true);
  }

  const openTutorialModal = () => {
    setTutorialTab(1);
    setTutorialModalOpen(true);
  }

  const openWarningModal = () => {
    setWarningModalOpen(true);
  }

  const changeTab = (event, newValue) => {
    setCurTab(newValue);
  };

  const placeObject = (objectType) => {
    dispatch(addObject(objectType));
  }

  const getImgHeight = (objectType) => {
    const objectHeight = getObjectSize(objectType).h;
    return Math.round((objectHeight / 36) * 80);
  }

  const handleChangeToolbarTab = (event, newValue) => {
    setToolbarTab(newValue);
  };

  return (
    <div>
      <Grid container className={classes.appBarContainer}>

        <Grid item>
          <img src={logo} style={{ height: 38, paddingRight: 18, paddingLeft: 4, paddingTop: 10 }} />
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant='h6' style={{ fontWeight: 'normal', paddingLeft: 4 }}>
                Floor Plan Lab
              </Typography>
            </Grid>

            <Grid item xs style={{ paddingTop: 2 }}>
              <Typography variant='caption' style={{ fontSize: 10, paddingLeft: 8, color: '#bcd0e0' }}>
                BETA
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Button size='small' className={classes.menuButton} onClick={handleClickFile}>
                    File
                  </Button>
                </Grid>

                <Grid item>
                  <Button size='small' className={classes.menuButton} onClick={handleClickTextbox}>
                    Place Text
                  </Button>
                </Grid>

                <Grid item>
                  <Button size='small' className={classes.menuButton} onClick={openObjectModal}>
                    Place Object
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <div className={classes.justifyRight}>
            <ButtonGroup variant="contained" color='primary'>
              <Button className={classes.button} onClick={openTutorialModal}>
                Tutorial
            </Button>
              <a href='https://github.com/dcarubia/floor-plan-lab'>
                <Button className={classes.button}>
                  View Source
                </Button>
              </a>

            </ButtonGroup>

          </div>
        </Grid>
      </Grid>

      <Menu
        anchorEl={textboxAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom" }}
        transformOrigin={{ vertical: "top" }}
        keepMounted
        open={Boolean(textboxAnchor)}
        onClose={handleCloseTextbox}
      >
        <Typography variant='overline' style={{ paddingLeft: 16 }}>Text Style:</Typography>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Label</MenuItem>
      </Menu>

      <Menu
        anchorEl={fileAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom" }}
        transformOrigin={{ vertical: "top" }}
        keepMounted
        open={Boolean(fileAnchor)}
        onClose={handleCloseFile}
      >
        <MenuItem onClick={openWarningModal} className={classes.menuItem}>New</MenuItem>
      </Menu>

      <Modal
        open={objectModalOpen}
        onClose={handleObjectModalClose}
        aria-labelledby="place-object"
      >
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item style={{ borderRight: '1px solid #d5d5d5', height: 680 }}>
              <Tabs
                orientation='vertical'
                value={curTab}
                onChange={changeTab}
                indicatorColor='primary'
                textColor='primary'
              >
                <Tab label="Doors" />
                <Tab label="Windows" />
                <Tab label="Kitchen" />
                <Tab label="Bathroom" />
                <Tab label="Living Room" />
                <Tab label="Dining Room" />
                <Tab label="Bedroom" />
                <Tab label="Laundry" />
              </Tabs>
            </Grid>

            <Grid item xs>
              {curTab === 0 ? // DOORS
                <div className={classes.modalContent}>
                  <Grid container spacing={1} >
                    {
                      objects.doors.map(object =>
                        <Grid item xs={6}>
                          <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                              <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Typography variant='body2'>{object.label}</Typography>
                            </div>

                          </div>
                        </Grid>
                      )
                    }
                  </Grid>
                </div>

                : curTab === 1 ? // WINDOWS
                  <div className={classes.modalContent}>
                    <Grid container spacing={1} >
                      {
                        objects.windows.map(object =>
                          <Grid item xs={6}>
                            <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='body2'>{object.label}</Typography>
                              </div>

                            </div>
                          </Grid>
                        )
                      }
                    </Grid>
                  </div>

                  : curTab === 2 ? // KITCHEN
                    <div className={classes.modalContent}>
                      <Grid container spacing={1} >
                        {
                          objects.kitchen.map(object =>
                            <Grid item xs={6}>
                              <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                  <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Typography variant='body2'>{object.label}</Typography>
                                </div>

                              </div>
                            </Grid>
                          )
                        }
                      </Grid>
                    </div>

                    : curTab === 3 ? // BATHROOM
                      <div className={classes.modalContent}>
                        <Grid container spacing={1} >
                          {
                            objects.bathroom.map(object =>
                              <Grid item xs={6}>
                                <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                    <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant='body2'>{object.label}</Typography>
                                  </div>

                                </div>
                              </Grid>
                            )
                          }
                        </Grid>
                      </div>

                      : curTab === 4 ? // LIVING ROOM
                        <div className={classes.modalContent}>
                          <Grid container spacing={1} >
                            {
                              objects.livingRoom.map(object =>
                                <Grid item xs={6}>
                                  <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                      <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <Typography variant='body2'>{object.label}</Typography>
                                    </div>

                                  </div>
                                </Grid>
                              )
                            }
                          </Grid>
                        </div>

                        : curTab === 5 ? // DINING ROOM
                          <div className={classes.modalContent}>
                            <Grid container spacing={1} >
                              {
                                objects.diningRoom.map(object =>
                                  <Grid item xs={6}>
                                    <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                        <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant='body2'>{object.label}</Typography>
                                      </div>

                                    </div>
                                  </Grid>
                                )
                              }
                            </Grid>
                          </div>

                          : curTab === 6 ? // BEDROOM
                            <div className={classes.modalContent}>
                              <Grid container spacing={1} >
                                {
                                  objects.bedroom.map(object =>
                                    <Grid item xs={6}>
                                      <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                          <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <Typography variant='body2'>{object.label}</Typography>
                                        </div>

                                      </div>
                                    </Grid>
                                  )
                                }
                              </Grid>
                            </div>

                            : curTab === 7 ? // LAUNDRY
                              <div className={classes.modalContent}>
                                <Grid container spacing={1} >
                                  {
                                    objects.laundry.map(object =>
                                      <Grid item xs={6}>
                                        <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                            <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                          </div>
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant='body2'>{object.label}</Typography>
                                          </div>

                                        </div>
                                      </Grid>
                                    )
                                  }
                                </Grid>
                              </div>

                              : curTab === 8 ? // STAIRS
                                <div className={classes.modalContent}>
                                  <Grid container spacing={1} >
                                    {
                                      objects.stairs.map(object =>
                                        <Grid item xs={6}>
                                          <div className={classes.imageContainer} onClick={() => placeObject(object.id)}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                              <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Typography variant='body2'>{object.label}</Typography>
                                            </div>

                                          </div>
                                        </Grid>
                                      )
                                    }
                                  </Grid>
                                </div>

                                : null
              }
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      <Modal
        open={warningModalOpen}
        onClose={null}
        aria-labelledby="warning"
      >
        <Paper className={classes.warningPaper}>
          <div style={{ padding: 24 }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>Warning: Creating a new plan will override the current plan.</Typography>
          </div>

          <Grid container>
            <Grid item xs={6} style={{ padding: 8 }}>
              <Button variant='contained' color='primary' fullWidth onClick={newFile} >New Plan</Button>
            </Grid>
            <Grid item xs={6} style={{ padding: 8 }}>
              <Button variant='contained' color='default' fullWidth onClick={handleWarningModalClose}>Cancel</Button>
            </Grid>
          </Grid>

        </Paper>
      </Modal>

      <Modal
        open={tutorialModalOpen}
        onClose={null}
        aria-labelledby="tutorial"
      >
        <Paper className={classes.tutorialPaper}>
          <div style={{ padding: '32px 8px 16px 8px', minHeight: 520 }}>
            {tutorialTab === 1 ?
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography color='primary' variant='h4' style={{ fontWeight: 'bold' }}>Welcome to Floor Plan Lab!</Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='subtitle1' style={{ fontSize: 18, fontWeight: 'bold' }}>This tutorial will show you how to design a floorplan using the built in tools.</Typography>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={plan1} className={classes.gif}></img>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='subtitle1' style={{ fontSize: 16 }} >At any point you can press "Skip Tutorial" to start designing.</Typography>
                  </div>
                </Grid>
              </Grid>
              : tutorialTab === 2 ?
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography color='primary' variant='h4' style={{ fontWeight: 'bold' }}>Project Scale</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography variant='subtitle1' style={{ fontSize: 18, fontWeight: 'bold' }}>Start each project by specifying a grid scale. By default each grid line equals 1 ft.</Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img src={changeScaleGif} className={classes.gif}></img>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography variant='subtitle1' style={{ fontSize: 16 }} >For more accurate object proportions we recommend decreaing the scale. </Typography>
                    </div>
                  </Grid>
                </Grid>
                : tutorialTab === 3 ?
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography color='primary' variant='h4' style={{ fontWeight: 'bold' }}>Toolbar</Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} style={{ padding: 0, marginRight: 8, marginBottom: 24, borderBottom: '1px solid #d5d5d5' }}>
                      <Tabs
                        orientation='horizontal'
                        value={toolbarTab}
                        onChange={handleChangeToolbarTab}
                        variant='fullWidth'
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        <Tab icon={<span className="fas fa-mouse-pointer"></span>} label="MOVE" />
                        <Tab icon={<PhotoSizeSelectSmallIcon />} label="SELECT" />
                        <Tab icon={<LinearScaleIcon />} label="LINEAR WALL" />
                        <Tab icon={<span className="fas fa-vector-square"></span>} label="RECT WALL" />
                        <Tab icon={<span className="fas fa-pen"></span>} label="DRAW" />
                        <Tab icon={<span className="fas fa-eraser"></span>} label="ERASE" />
                      </Tabs>
                    </Grid>
                    {toolbarTab === 0 ? // MOVE
                      <>
                        <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                          <img src={moveToolGif} style={{ maxWidth: 360 }}></img>
                        </Grid>
                        <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                          <Typography variant='h4'>Move Tool</Typography>
                          <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Position objects and labels.</Typography>
                          <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Click and drag an object or label to move it.</Typography>
                          <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>When an object is selected, an object toolbar will appear at the top right of your screen. Use this toolbar to rotate, flip, or delete the selected object. </Typography>
                          <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Note: Clicking an object at any time will automatically enable the move tool</Typography>
                        </Grid>
                      </>
                      : toolbarTab === 1 ? // SELECT
                        <>
                          <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                            <img src={selectToolGif} style={{ maxWidth: 360 }}></img>
                          </Grid>
                          <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                            <Typography variant='h4'>Selection Tool</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Click and drag to select grid-squares.</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Keyboard commands:</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 18, margin: '4px 0px 0px 0px' }}><strong>[W] - </strong>Creates a wall from the selected grid-squares</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 18, margin: '4px 0px 0px 0px' }}><strong>[BACKSPACE] - </strong>Deletes selected walls</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 18, margin: '4px 0px 0px 0px' }}><strong>[ESC] - </strong>Cancels current selection</Typography>
                            <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Note: The selection tool has no affect on objects or labels</Typography>
                          </Grid>
                        </>
                        : toolbarTab === 2 ? // LINEAR WALL
                          <>
                            <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                              <img src={lineToolGif} style={{ maxWidth: 360 }}></img>
                            </Grid>
                            <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                              <Typography variant='h4'>Linear Wall Tool</Typography>
                              <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Build straight walls one grid-square in width.</Typography>
                              <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Click on a grid-square or wall to place the first anchor point, then click a different square in the same row or column to build the wall.</Typography>
                              <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Keyboard commands:</Typography>
                              <Typography variant='subtitle1' style={{ fontSize: 18, margin: '4px 0px 0px 0px' }}><strong>[ESC] - </strong>Removes anchor point</Typography>
                              <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Note: You can use the linear wall tool to measure distances without building a wall</Typography>
                            </Grid>
                          </>
                          : toolbarTab === 3 ? // RECTANGULAR WALL
                            <>
                              <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                                <img src={rectWallGif} style={{ maxWidth: 360 }}></img>
                              </Grid>
                              <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                                <Typography variant='h4'>Rectangular Wall Tool</Typography>
                                <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Build a rectangular room surrounded by walls.</Typography>
                                <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Click on a grid-square or wall to place the first anchor point, then click a different square to build the wall.</Typography>
                                <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Keyboard commands:</Typography>
                                <Typography variant='subtitle1' style={{ fontSize: 18, margin: '4px 0px 0px 0px' }}><strong>[ESC] - </strong>Removes anchor point</Typography>
                                <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Note: You can use the rectangular wall tool to measure dimensions and room area without building a wall</Typography>
                              </Grid>
                            </>
                            : toolbarTab === 4 ? // DRAW
                              <>
                                <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                                  <img src={drawToolGif} style={{ maxWidth: 360 }}></img>
                                </Grid>
                                <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                                  <Typography variant='h4'>Draw Tool</Typography>
                                  <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Freely draw walls.</Typography>
                                  <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Click and drag to convert empty grid-squares into walls.</Typography>
                                </Grid>
                              </>
                              : toolbarTab === 5 ? // ERASE
                                <>
                                  <Grid item xs={5} style={{ padding: '8px 0px 0px 36px' }}>
                                    <img src={eraseToolGif} style={{ maxWidth: 360 }}></img>
                                  </Grid>
                                  <Grid item xs={7} style={{ paddingLeft: 24, paddingRight: 24 }}>
                                    <Typography variant='h4'>Eraser Tool</Typography>
                                    <Typography variant='subtitle1' style={{ fontSize: 21, margin: '0px 0px 0px 0px' }}>Remove walls.</Typography>
                                    <Typography variant='subtitle1' style={{ fontSize: 18, margin: '24px 0px 0px 0px' }}>Click and drag to erase a wall.</Typography>
                                  </Grid>
                                </>
                                : null
                    }
                  </Grid>
                  : tutorialTab === 4 ?
                    <Grid container spacing={1}>


                      <Grid item xs={8}>
                        <Grid container spacing={1} style={{ padding: '0px 24px 0px 24px' }}>
                          <Grid item xs={12}>
                            <Typography color='primary' variant='h4' style={{ fontWeight: 'bold' }}>Place Objects</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1' style={{ fontSize: 18, fontWeight: 'bold' }}>Place common floorplan symbols that scale automatically.</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1' style={{ fontSize: 15 }} >In the "Place Object" menu, choose a category and click on an object to place it. When overlapping, the more recently placed object will be in the front.</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1' style={{ fontSize: 15 }} >To delete an object, click on it to select the object, then click delete in the object toolbar located at the top right of your screen.</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={4}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <img src={placeObjectGif} style={{ maxHeight: 250 }}></img>
                        </div>
                      </Grid>

                      <Grid item>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 24 }}>
                          <img src={placeTextGif} style={{ maxHeight: 250 }}></img>
                        </div>
                      </Grid>
                      <Grid item xs>
                        <Grid container spacing={1} style={{ padding: '24px 24px 0px 24px' }}>
                          <Grid item xs={12}>
                            <Typography color='primary' variant='h4' style={{ fontWeight: 'bold' }}>Place Text</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1' style={{ fontSize: 18, fontWeight: 'bold' }}>Place a draggable text label.</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1' style={{ fontSize: 15 }} >In the "Place Text" menu, choose "Label". Type your label and press enter or click "Save". Click on the label at any time to make changes. To move the textbox, enter edit mode then click and drag on the handle at the left side of the textbox.</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    : null
            }

          </div>

          <Grid container>
            <Grid item xs={3} style={{ padding: '0px 16px 16px 16px' }}>
              <Button variant='contained' color='default' onClick={handleTutorialModalClose}>Skip Tutorial</Button>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
                <Typography variant='h6'>{tutorialTab}/4</Typography>
              </div>
            </Grid>
            <Grid item xs={6} style={{ padding: '0px 16px 16px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {tutorialTab > 1 ?
                  <Button variant='contained' color='default' onClick={() => setTutorialTab(tutorialTab - 1)} style={{ marginRight: 8 }}>Back</Button>
                  : null}
                {tutorialTab < 4 ?
                  <Button variant='contained' color='primary' onClick={() => setTutorialTab(tutorialTab + 1)} >Next</Button>
                  : null}
                {tutorialTab === 4 ?
                  <Button variant='contained' color='primary' onClick={handleTutorialModalClose} >Finish</Button>
                  : null}
              </div>
            </Grid>
          </Grid>

        </Paper>
      </Modal>
    </div >
  );
}

export default AppBar;