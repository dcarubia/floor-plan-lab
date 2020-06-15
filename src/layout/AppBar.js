import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem, Paper, Modal, Tabs, Tab } from '@material-ui/core';
import { addText } from '../actions/sheetActions';
import { useDispatch } from 'react-redux';
import logo from '../images/logo.png';
import { addObject } from '../actions/sheetActions';
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
import '@fortawesome/fontawesome-free/css/all.css';

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
    backgroundColor: '#f0f0f0',
    top: '100px',
    left: 'calc(50vw - 300px)',
  },
  modalContent: {
    width: 480,
    padding: '0px 16px 16px 0px',
  },
  imageContainer: {
    marginLeft: 16,
    marginTop: 16,
    padding: '8px 24px 8px 24px',
    '&:hover': {
      backgroundColor: '#e4e4e4'
    }
  },
  image: {
    paddingBottom: 8
  }
});

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
    return Math.round((objectHeight / 36) * 50);
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
            <Grid item style={{ borderRight: '1px solid #d5d5d5' }}>
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
                <Tab label="Stairs" />
              </Tabs>
            </Grid>

            <Grid item xs>
              {curTab === 0 ?
                <Grid container className={classes.modalContent}>
                  <Grid item className={classes.imageContainer} onClick={() => placeObject('SINGLE_DOOR')}>
                    <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={singleDoor} className={classes.image} style={{ height: getImgHeight('SINGLE_DOOR') }} />
                    </div>
                    <Typography variant='body1'>Single Door (32")</Typography>
                  </Grid>

                  <Grid item className={classes.imageContainer} onClick={() => placeObject('DOUBLE_DOOR')}>
                    <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={doubleDoor} className={classes.image} style={{ height: getImgHeight('DOUBLE_DOOR') }} />
                    </div>
                    <Typography variant='body1'>Double Door (64")</Typography>
                  </Grid>

                  <Grid item className={classes.imageContainer} onClick={() => placeObject('SLIDING_DOOR')}>
                    <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={slidingDoor} className={classes.image} style={{ height: getImgHeight('SLIDING_DOOR') }} />
                    </div>
                    <Typography variant='body1'>Sliding Door (64")</Typography>
                  </Grid>

                  <Grid item className={classes.imageContainer} onClick={() => placeObject('POCKET_DOOR')}>
                    <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={pocketDoor} className={classes.image} style={{ height: getImgHeight('POCKET_DOOR') }} />
                    </div>
                    <Typography variant='body1'>Pocket Door (64")</Typography>
                  </Grid>

                  <Grid item className={classes.imageContainer} onClick={() => placeObject('BIFOLD_DOOR')}>
                    <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={bifoldDoor} className={classes.image} style={{ height: getImgHeight('BIFOLD_DOOR') }} />
                    </div>
                    <Typography variant='body1'>Bi-fold Door (60")</Typography>
                  </Grid>

                </Grid>


                : curTab === 1 ?
                  <Grid container className={classes.modalContent}>

                    <Grid item className={classes.imageContainer} onClick={() => placeObject('WINDOW_32')}>
                      <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={window} className={classes.image} style={{ height: getImgHeight('WINDOW_32') }} />
                      </div>
                      <Typography variant='body1'>Window (32")</Typography>
                    </Grid>

                    <Grid item className={classes.imageContainer} onClick={() => placeObject('WINDOW_48')}>
                      <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={window} className={classes.image} style={{ height: getImgHeight('WINDOW_48') }} />
                      </div>
                      <Typography variant='body1'>Window (48")</Typography>
                    </Grid>

                    <Grid item className={classes.imageContainer} onClick={() => placeObject('WINDOW_60')}>
                      <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={window} className={classes.image} style={{ height: getImgHeight('WINDOW_60') }} />
                      </div>
                      <Typography variant='body1'>Window (60")</Typography>
                    </Grid>


                  </Grid>

                  : curTab === 2 ?
                    <Grid container className={classes.modalContent}>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('COUNTER_END')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={counterEnd} className={classes.image} style={{ height: getImgHeight('COUNTER_END') }} />
                        </div>
                        <Typography variant='body1'>Counter End (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('COUNTER_MIDDLE')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={counterMiddle} className={classes.image} style={{ height: getImgHeight('COUNTER_MIDDLE') }} />
                        </div>
                        <Typography variant='body1'>Counter Middle (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('COUNTER_CORNER')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={counterCorner} className={classes.image} style={{ height: getImgHeight('COUNTER_CORNER') }} />
                        </div>
                        <Typography variant='body1'>Counter Corner (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('COOK_TOP')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={cookTop} className={classes.image} style={{ height: getImgHeight('COOK_TOP') }} />
                        </div>
                        <Typography variant='body1'>Cook Top (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('DISHWASHER')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={dishwasher} className={classes.image} style={{ height: getImgHeight('DISHWASHER') }} />
                        </div>
                        <Typography variant='body1'>Dishwasher (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('SINK')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={sink} className={classes.image} style={{ height: getImgHeight('SINK') }} />
                        </div>
                        <Typography variant='body1'>Sink (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('DOUBLE_SINK')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={doubleSink} className={classes.image} style={{ height: getImgHeight('DOUBLE_SINK') }} />
                        </div>
                        <Typography variant='body1'>Double Sink (48")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('REFRIGERATOR')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={refrigerator} className={classes.image} style={{ height: getImgHeight('REFRIGERATOR') }} />
                        </div>
                        <Typography variant='body1'>Refrigerator (24")</Typography>
                      </Grid>

                      <Grid item className={classes.imageContainer} onClick={() => placeObject('OVEN')}>
                        <div style={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={oven} className={classes.image} style={{ height: getImgHeight('OVEN') }} />
                        </div>
                        <Typography variant='body1'>Oven (24")</Typography>
                      </Grid>


                    </Grid>

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