import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { addText } from '../actions/sheetActions';
import { useDispatch } from 'react-redux';
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

        <Grid item>
          <Button size='small' className={classes.menuButton} onClick={handleClickTextbox}>
            Place Text
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

      <Menu
        anchorEl={textboxAnchor}
        keepMounted
        open={Boolean(textboxAnchor)}
        onClose={handleCloseTextbox}
      >
        <Typography variant='overline' style={{ paddingLeft: 16 }}>Text Style:</Typography>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Title</MenuItem>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>Label</MenuItem>
      </Menu>
    </div>
  );
}

export default AppBar;