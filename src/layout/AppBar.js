import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem, Paper, Modal, Tabs, Tab } from '@material-ui/core';
import { addText } from '../actions/sheetActions';
import { useDispatch } from 'react-redux';
import logo from '../images/logo.png';
import singleDoor from '../images/objects/singleDoor.png'
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
    top: '20%',
    left: '30%',
  },
  modalContent: {
    minWidth: 500,
    padding: '16px 16px 16px 0px'
  },
  imageContainer: {
    marginLeft: 16,
    padding: '8px 24px 8px 24px',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  image: {
    width: 80,
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
              <Grid container className={classes.modalContent}>
                <Grid item className={classes.imageContainer}>
                  <img src={singleDoor} className={classes.image} />
                  <Typography variant='body1'>Single Door</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}

export default AppBar;