import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import useStyles from './style';

const MainLoader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <CircularProgress color="secondary" size={80} />
    </Box>
  );
};

export default MainLoader;
