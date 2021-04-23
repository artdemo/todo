import React from 'react';
import PropTypes from 'prop-types';
import { Container, Paper } from '@material-ui/core';
import useStyles from './style';

const FrameBox = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.paper}>
        {children}
      </Paper>
    </Container>
  );
};

FrameBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FrameBox;
