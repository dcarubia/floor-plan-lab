import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    padding: 0,
    height: 22,
    width: 22,
  }
});

function Box({ isPositionOutside }) {
  const classes = useStyles();
  const [positionOutside, setPositionOutside] = React.useState(isPositionOutside);

  React.useEffect(() => {
    setPositionOutside(isPositionOutside)
  }, [isPositionOutside])

  return (
    <div className={classes.root} style={
      positionOutside ?
        {
          borderRight: '1px solid #becddb',
          borderBottom: '1px solid #becddb',
        }
        :
        {
          backgroundColor: '#ccdcea',
          borderRight: '1px solid #becddb',
          borderBottom: '1px solid #becddb',
        }
    }>

    </div>
  );
}

export default Box;