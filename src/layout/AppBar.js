import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.css';

const useStyles = makeStyles({
  appBarContainer: {
    padding: '10px 24px 10px 24px',
    color: '#fff',
    background: '#24292E',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    height: 56,
    borderBottom: '1px solid #000'
  },
  button: {
    color: '#fff',
    background: '#43505b',
    '&:hover': {
      background: '#5d6e7c',
    }
  },
  menuButton: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      background: '#5d6e7c',
    }
  },
  justifyRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
});

function AppBar() {
  const classes = useStyles();

  const redirectToSource = () => {
    window.location.href = "https://github.com/dcarubia/easy-floorplan";
  }

  return (
    <Grid container className={classes.appBarContainer}>

      <Grid item>
        <Typography variant='h5' style={{ fontWeight: 'bold', paddingRight: 32 }}>
          Floorplan.io
        </Typography>
      </Grid>

      <Grid item>
        <Button size='small' className={classes.menuButton}>
          File
          <span className="fas fa-chevron-down" style={{ paddingLeft: 8, fontSize: 10 }}></span>
        </Button>
      </Grid>

      <Grid item>
        <Button size='small' className={classes.menuButton}>
          Edit
          <span className="fas fa-chevron-down" style={{ paddingLeft: 8, fontSize: 10 }}></span>
        </Button>
      </Grid>

      <Grid item>
        <Button size='small' className={classes.menuButton}>
          Place Object
          <span className="fas fa-chevron-down" style={{ paddingLeft: 8, fontSize: 10 }}></span>
        </Button>
      </Grid>


      <Grid item xs>
        <div className={classes.justifyRight}>
          <Button className={classes.button} variant='contained' onClick={redirectToSource}>
            View Source
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default AppBar;