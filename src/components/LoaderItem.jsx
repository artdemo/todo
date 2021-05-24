import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box } from '@material-ui/core';
import { useStyles } from './LoaderItem.styles';

export const LoaderItem = ({ isVisible }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.box} ${isVisible || classes.hidden}`}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

LoaderItem.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
