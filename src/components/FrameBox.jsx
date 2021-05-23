import React from 'react';
import PropTypes from 'prop-types';
import { Container, Paper, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './FrameBox.styles';

export const FrameBox = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Container
      maxWidth="sm"
      className={classes.container}
      disableGutters={isXs}
    >
      <Paper elevation={3} className={classes.paper}>
        {children}
      </Paper>
    </Container>
  );
};

FrameBox.propTypes = {
  children: PropTypes.node.isRequired,
};
