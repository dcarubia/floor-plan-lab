import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem, Paper, Modal, Tabs, Tab } from '@material-ui/core';
import { addText, addObject } from '../actions/sheetActions';
import { setAnchor, updateEdges, setCurShape, updateSelected } from '../actions/sheetActions';
import { setTool } from '../actions/toolActions';
import { useDispatch } from 'react-redux';
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
    height: 'calc(100vh - 64px - 32px)',
    top: 64,
    left: 200,
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
  }
});

const objects = {
  doors: [
    {
      id: 'SINGLE_DOOR',
      file: singleDoor,
      label: 'Single Door - 32\"'
    },
    {
      id: 'DOUBLE_DOOR',
      file: doubleDoor,
      label: 'Double Door - 64\"'
    },
    {
      id: 'SLIDING_DOOR',
      file: slidingDoor,
      label: 'Sliding Door - 64\"'
    },
    {
      id: 'POCKET_DOOR',
      file: pocketDoor,
      label: 'Pocket Door - 64\"'
    },
    {
      id: 'BIFOLD_DOOR',
      file: bifoldDoor,
      label: 'Bi-fold Door - 60\"'
    },
  ],
  windows: [
    {
      id: 'WINDOW_32',
      file: window,
      label: 'Window - 32\"'
    },
    {
      id: 'WINDOW_48',
      file: window,
      label: 'Window - 48\"'
    },
    {
      id: 'WINDOW_60',
      file: window,
      label: 'Window - 60\"'
    },
  ],
  kitchen: [
    {
      id: 'COUNTER_END',
      file: counterEnd,
      label: 'Counter End - 24\"'
    },
    {
      id: 'COUNTER_MIDDLE',
      file: counterMiddle,
      label: 'Counter Middle - 24\"'
    },
    {
      id: 'COUNTER_CORNER',
      file: counterCorner,
      label: 'Counter Corner - 24\"'
    },
    {
      id: 'COOK_TOP',
      file: cookTop,
      label: 'Cook Top - 24\"'
    },
    {
      id: 'DISHWASHER',
      file: dishwasher,
      label: 'Dishwasher - 24\"'
    },
    {
      id: 'SINK',
      file: sink,
      label: 'Sink - 24\"'
    },
    {
      id: 'DOUBLE_SINK',
      file: doubleSink,
      label: 'Double Sink - 24\"'
    },
    {
      id: 'REFRIGERATOR',
      file: refrigerator,
      label: 'Refrigerator - 24\"'
    },
    {
      id: 'OVEN',
      file: oven,
      label: 'Oven - 24\"'
    },
  ],
  bathroom: [
    {
      id: 'BR_SINK',
      file: bathroomSink,
      label: 'Bathroom Sink - 24\"'
    },
    {
      id: 'BATH',
      file: bath,
      label: 'Bath - 60\"'
    },
    {
      id: 'SHOWER_RECT',
      file: showerRect,
      label: 'Shower Rect. - 60\"'
    },
    {
      id: 'SHOWER_SQUARE',
      file: showerSquare,
      label: 'Shower Square - 32\"'
    },
    {
      id: 'TOILET',
      file: toilet,
      label: 'Toilet - 30\"'
    },
  ],
  livingRoom: [
    {
      id: 'CHAIR',
      file: chair,
      label: 'Chair - 35\"'
    },
    {
      id: 'LOVESEAT',
      file: loveSeat,
      label: 'Loveseat - 58\"'
    },
    {
      id: 'SOFA',
      file: sofa,
      label: 'Sofa - 84\"'
    },
    {
      id: 'COFFEE_TABLE',
      file: coffeeTable,
      label: 'Coffee Table - 40\"'
    },
    {
      id: 'END_TABLE',
      file: endTable,
      label: 'End Table - 18\"'
    },
  ],
  diningRoom: [
    {
      id: 'TABLE_ROUND',
      file: tableRound,
      label: 'Round Table - 36\"'
    },
    {
      id: 'TABLE_RECT',
      file: tableRect,
      label: 'Rectangular Table - 48\"'
    },
  ],
  bedroom: [
    {
      id: 'QUEEN_BED',
      file: queenBed,
      label: 'Queen Bed - 60\"x80\"'
    },
    {
      id: 'TWIN_BED',
      file: twinBed,
      label: 'Twin Bed - 38\"x75\"'
    },
    {
      id: 'END_TABLE',
      file: endTable,
      label: 'End Table - 18\"'
    },
  ],
  laundry: [
    {
      id: 'WASHER',
      file: washer,
      label: 'Washer - 27\"'
    },
    {
      id: 'DRYER',
      file: dryer,
      label: 'Dryer - 27\"'
    },
  ],
  stairs: [

  ],
}

function AppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [textboxAnchor, setTextboxAnchor] = React.useState(null);
  const [objectModalOpen, setObjectModalOpen] = React.useState(false);
  const [curTab, setCurTab] = React.useState(0);

  const redirectToSource = () => {
    window.location.href = "https://github.com/dcarubia/easy-floorplan";
  }

  const handleClickTextbox = (event) => {
    setTextboxAnchor(event.currentTarget);
  };

  const handleCloseTextbox = () => {
    setTextboxAnchor(null);
  };

  const insertLabel = () => {
    dispatch(addText('label'));
    handleCloseTextbox();
  }

  const handleObjectModalClose = () => {
    setObjectModalOpen(false);
  };

  const openObjectModal = () => {
    dispatch(setTool('POINTER'));
    dispatch(setAnchor(null));
    dispatch(setCurShape(null));
    dispatch(updateEdges([]));
    dispatch(updateSelected([]));
    setObjectModalOpen(true);
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

  return (
    <div>
      <Grid container className={classes.appBarContainer}>

        <Grid item>
          <img src={logo} style={{ height: 38, paddingRight: 18, paddingLeft: 4, paddingTop: 10 }} />
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h6' style={{ fontWeight: 'normal', paddingLeft: 4 }}>
                Floor Plan Lab
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Button size='small' className={classes.menuButton}>
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
            <Button className={classes.button} variant='contained' onClick={redirectToSource}>
              View Source
            </Button>
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
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Title</MenuItem>
      </Menu>

      <Modal
        open={objectModalOpen}
        onClose={handleObjectModalClose}
        aria-labelledby="place-object"
      >
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item style={{ borderRight: '1px solid #d5d5d5', height: 'calc(100vh - 64px - 32px)' }}>
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
                            <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                              <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                            </div>
                            <Typography variant='body2'>{object.label}</Typography>
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
                              <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                              </div>
                              <Typography variant='body2'>{object.label}</Typography>
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
                                <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                  <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                </div>
                                <Typography variant='body2'>{object.label}</Typography>
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
                                  <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                    <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                  </div>
                                  <Typography variant='body2'>{object.label}</Typography>
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
                                    <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                      <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                    </div>
                                    <Typography variant='body2'>{object.label}</Typography>
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
                                      <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                        <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                      </div>
                                      <Typography variant='body2'>{object.label}</Typography>
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
                                        <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                          <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                        </div>
                                        <Typography variant='body2'>{object.label}</Typography>
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
                                          <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                            <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                          </div>
                                          <Typography variant='body2'>{object.label}</Typography>
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
                                            <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                                              <img src={object.file} className={classes.image} style={{ height: getImgHeight(object.id) }} />
                                            </div>
                                            <Typography variant='body2'>{object.label}</Typography>
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
    </div>
  );
}

export default AppBar;