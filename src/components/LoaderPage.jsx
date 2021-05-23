import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './LoaderPage.styles';

export const LoaderPage = () => {
  const classes = useStyles();

  return <CircularProgress color="secondary" className={classes.loaderPage} />;
};
