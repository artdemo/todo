import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { useStyles } from './LoaderMain.styles';

export const LoaderMain = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <CircularProgress color="secondary" size={80} />
    </Box>
  );
};
