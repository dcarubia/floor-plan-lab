import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Tooltip, Fab, Modal, Grid, Typography, TextField, OutlinedInput, InputAdornment, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import boxSideLengthImg from '../images/boxSideLength.png';
import { useDispatch } from 'react-redux';
import { setScale } from '../actions/sheetActions';
import NumericInput from 'react-numeric-input';

const useStyles = makeStyles({
  paper: {
    padding: '16px 24px 16px 24px',
    position: 'absolute',
    outline: 0,
    top: '35%',
    left: '35%',
    width: 350
  },
  fab: {
    fontWeight: 'bold',
    fontSize: 18,
    position: 'fixed',
    bottom: 10,
    right: 10,
    backgroundColor: '#5d6e7c',
    color: '#fff',
    '&:hover': {
      background: '#758796',
    }
  },
  toolTip: {
    fontSize: 14,
  },
  img: {
    height: 50
  },
  inputContainer: {
    marginTop: 12,
    marginRight: 8
  },
  saveButton: {
    backgroundColor: '#88baea',
    '&:hover': {
      backgroundColor: '#6fabe2'
    }
  }
});

function SetScaleModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [scaleModalOpen, setScaleModalOpen] = React.useState(false);
  const [feetInput, setFeetInput] = React.useState(1);
  const [inchesInput, setInchesInput] = React.useState(0);
  const scale = useSelector(state => state.sheet.scale);

  const handleClose = () => {
    setScaleModalOpen(false);
  };

  const toggleModal = () => {
    setScaleModalOpen(!scaleModalOpen);
    setFeetInput(scale.ft);
    setInchesInput(scale.in);
  }

  const handleFeetInput = (value) => {
    setFeetInput(value);
  }

  const handleInchesInput = (value) => {
    setInchesInput(value);
  }

  const onSave = () => {
    const feet = parseInt(feetInput);
    const inches = parseInt(inchesInput);
    if (feet > 0 || inches > 0) {
      // Valid number entered
      dispatch(setScale({ ft: feet, in: inches }));
      setScaleModalOpen(false);
    } else {
      // Error
    }
  }

  return (
    <>
      <Tooltip title={<span className={classes.toolTip}>Change Scale</span>} placement='top' arrow>
        <Fab onClick={toggleModal} variant="extended" size='small' className={classes.fab} style={{ paddingLeft: 16, paddingRight: 16, }}>
          <span className="far fa-square" style={{ paddingRight: 8 }}></span>
            = {scale.ft}'{scale.in}"
          </Fab>
      </Tooltip>

      <Modal
        open={scaleModalOpen}
        onClose={handleClose}
        aria-labelledby="change-scale"
      >
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>
                Grid Scale
              </Typography>
            </Grid>



            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <img src={boxSideLengthImg} className={classes.img} />
                </Grid>
                <Grid item>
                  <Grid container className={classes.inputContainer}>
                    <Grid item>
                      <NumericInput strict min={0} max={50} size={3} value={feetInput} onChange={(e) => handleFeetInput(e)} />
                    </Grid>
                    <Grid item xs>
                      <Typography style={{ paddingLeft: 4 }}>Feet</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container className={classes.inputContainer}>
                    <Grid item>
                      <NumericInput strict min={0} max={11} size={3} value={inchesInput} onChange={(e) => handleInchesInput(e)} />
                    </Grid>
                    <Grid item xs>
                      <Typography style={{ paddingLeft: 4 }}>Inches</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='caption' style={{ color: 'red' }}>
                Note: Changing the scale will resize objects but not walls.
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Button fullWidth variant='contained' className={classes.saveButton} onClick={onSave}>
                Save
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button fullWidth variant='contained' onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}

export default SetScaleModal;