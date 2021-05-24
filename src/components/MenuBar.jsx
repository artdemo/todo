import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Icon } from './Icon';
import { useStyles } from './MenuBar.styles';

export const MenuBar = ({ title, handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={handleDrawerToggle} className={classes.menuButton}>
          <Icon iconName="menu" fontSize="large" iconColor="white" />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.appBarHeading}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

MenuBar.propTypes = {
  title: PropTypes.string,
  handleDrawerToggle: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
  title: '',
};
