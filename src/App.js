import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import AppBar from './layout/AppBar';
import ToolBar from './layout/ToolBar';
import GridContainer from './layout/GridContainer';
import CoordinateToolTip from './components/CoordinateToolTip';

function App() {
  const sheet = [];

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
    </div>
  );
}

export default App;
