import React from 'react';
import { Grid } from '@material-ui/core';
import AppBar from './layout/AppBar';
import './App.css';
import ToolBar from './layout/ToolBar';
import GridContainer from './layout/GridContainer';
import CoordinateToolTip from './components/CoordinateToolTip';
import MouseToolTip from './components/MouseToolTip';
import SetScaleModal from './components/SetScaleModal';

function App() {

  React.useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      setTimeout(() => {
        // fade out
        ele.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = ''
        }, 2000)
      }, 3000);
    }
  }, [])

  return (
    <div>
      <Grid container>

        <Grid item xs={12}>
          <AppBar />
        </Grid>

        <Grid item>
          <ToolBar />
        </Grid>

        <Grid item xs>
          <GridContainer />
        </Grid>
      </Grid>

      <CoordinateToolTip />
      <MouseToolTip />
      <SetScaleModal />
    </div>
  );
}

export default App;
