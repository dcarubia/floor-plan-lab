import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '../components/box';
import ReactCursorPosition from 'react-cursor-position';
import '@fortawesome/fontawesome-free/css/all.css';
import TextContainer from '../components/TextContainer';
import ObjectContainer from '../components/ObjectContainer';
import { boxSize } from '../config';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: `calc(150 * ${boxSize + 1})`
  },
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
        isWall: false
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
    <div id="grid-container" className={classes.container}>

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

      <ObjectContainer />
      <TextContainer />
    </div>

  );
}

export default GridContainer;