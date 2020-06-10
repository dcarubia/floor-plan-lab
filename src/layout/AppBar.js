import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { addText } from '../actions/sheetActions';
import { useDispatch } from 'react-redux';
import logo from '../logo.png';
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
  }
});

function AppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [textboxAnchor, setTextboxAnchor] = React.useState(null);

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

  return (
    <div>
      <Grid container className={classes.appBarContainer}>

        <Grid item>
          <img src={logo} style={{ height: 38, paddingRight: 18, paddingLeft: 4, paddingTop: 10 }} />
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h6' style={{ fontWeight: 'bold', paddingLeft: 4 }}>
                Floorplan.io
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
                  <Button size='small' className={classes.menuButton}>
                    Place Object
                  </Button>
                </Grid>

                <Grid item>
                  <Button size='small' className={classes.menuButton} onClick={handleClickTextbox}>
                    Place Text
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
        keepMounted
        open={Boolean(textboxAnchor)}
        onClose={handleCloseTextbox}
      >
        <Typography variant='overline' style={{ paddingLeft: 16 }}>Text Style:</Typography>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Label</MenuItem>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Title</MenuItem>
      </Menu>
    </div>
  );
}

export default AppBar;