import React from 'react';
import { Grid } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './layout/AppBar';
import './App.css';
import ToolBar from './layout/ToolBar';
import GridContainer from './layout/GridContainer';
import CoordinateToolTip from './components/CoordinateToolTip';
import MouseToolTip from './components/MouseToolTip';
import SetScaleModal from './components/SetScaleModal';

function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#24292E',
      },
    },
  });

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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
