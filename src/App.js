import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './layout/AppBar';
import './App.css';
import ToolBar from './layout/ToolBar';
import GridContainer from './layout/GridContainer';
import CoordinateToolTip from './components/CoordinateToolTip';
import MouseToolTip from './components/MouseToolTip';
import SetScaleModal from './components/SetScaleModal';
import { isMobile } from 'react-device-detect';
import logo from './images/favicon.png';

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
        {
          !isMobile ?
            <>
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
            </>
            :
            <div style={{ position: 'fixed', top: '35%', width: '100vw' }} >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img width="112" height="112" src={logo} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
                <Typography variant='h6'>
                  Coming soon to mobile platforms.
              </Typography>
              </div>
            </div>
        }

      </ThemeProvider>
    </div>
  );
}

export default App;
