import React from 'react';
import PropTypes from 'prop-types';
import { Hidden, Drawer, Divider } from '@material-ui/core';
import { useStyles } from './Menu.styles';
import { SortPanel } from './SortPanel';
import { Nav } from './Nav';

export const Menu = ({
  locationPathname,
  routes,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const classes = useStyles();

  const drawer = (
    <>
      <Nav locationPathname={locationPathname} routes={routes} />
      <Divider />
      {(locationPathname === '/main' || locationPathname === '/') && (
        <SortPanel />
      )}
    </>
  );

  return (
    <>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

Menu.propTypes = {
  locationPathname: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  routes: [],
};
