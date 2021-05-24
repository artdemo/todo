import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import { useStyles } from './Nav.styles';

export const Nav = ({ locationPathname, routes }) => {
  const classes = useStyles();

  return (
    <Tabs
      value={locationPathname}
      orientation="vertical"
      className={classes.tabs}
    >
      {routes
        .filter(({ path }) => path !== '*')
        .map(({ path, title }) => (
          <Tab
            key={path}
            label={title}
            to={path}
            value={path}
            component={Link}
            onClick={(e) => {
              if (locationPathname === path) e.preventDefault();
            }}
          />
        ))}
    </Tabs>
  );
};

Nav.propTypes = {
  locationPathname: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Nav.defaultProps = {
  routes: [],
};
