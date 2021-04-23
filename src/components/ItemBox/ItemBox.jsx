import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import useStyles from './style';

const ItemBox = ({ children }) => {
  const classes = useStyles();

  return <ListItem className={classes.gutters}>{children}</ListItem>;
};

ItemBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ItemBox;
