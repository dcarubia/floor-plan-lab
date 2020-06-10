import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import Box from '../components/box';
import ReactCursorPosition from 'react-cursor-position';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector } from 'react-redux';
import TextContainer from '../components/TextContainer';

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 64px)',
    width: 'calc(100vw - 54px)',
    overflow: 'scroll'
  },
  container: {
    position: 'relative',
    width: 'calc(150 * 23px)'
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
  }
});

/* --------------------------------------------
Returns an empty grid of size (100 x 150)
----------------------------------------------- */
const initializeSheet = () => {
  const rows = [];
  // Create 100 rows
  for (let i = 0; i < 100; i++) {

    const curRow = [];
    for (let j = 0; j < 150; j++) {
      // Create 100 boxes in each row
      curRow.push({
        row: i,
        col: j,
        isWall: false,
        isAnchor: false,
        isEdge: false
      })
    }
    // add current row to rows array
    rows.push({
      index: i,
      elements: curRow
    });

  }
  return rows;
};

function GridContainer() {
  const classes = useStyles();
  const [sheet, setSheet] = useState(initializeSheet);

  return (
    <div className={classes.root}>
      <div className={classes.container}>

        {sheet.map((row) =>

          <div key={row.index}
            style={{
              whiteSpace: 'nowrap',
              fontSize: 0
            }}>

            {row.elements.map((box) =>
              <ReactCursorPosition key={box.col} style={{ display: 'inline-block' }}>
                <Box boxProps={box} />
              </ReactCursorPosition>
            )}

          </div>

        )}

        <Tooltip title={<span className={classes.toolTip}>Change Scale</span>} placement='top' arrow>
          <Fab variant="extended" size='small' className={classes.fab} style={{ paddingLeft: 16, paddingRight: 16, }}>
            <span className="far fa-square" style={{ paddingRight: 8 }}></span>
            = 1 sqft
          </Fab>
        </Tooltip>

        <TextContainer />
      </div>
    </div>
  );
}

export default GridContainer;