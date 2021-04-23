import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box } from '@material-ui/core';
import useStyles from './style';

const ItemLoader = ({ isVisible }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.box} ${isVisible || classes.hidden}`}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

ItemLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default ItemLoader;
