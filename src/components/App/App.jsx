import React, { useMemo, useState } from 'react';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Drawer,
  Hidden,
  CssBaseline,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import Icon from '../Icon';
import SortPanel from '../SortPanel';
import useStyles from './style';
import { routes } from '../../routes';

const App = ({ location }) => {
  const classes = useStyles();
  // Does the current path match the route
  const route = routes.find(({ path }) => path === location.pathname);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ================= TABS ================= //
  const tabsToRender = useMemo(
    () =>
      routes
        .filter(({ path }) => path !== '*')
        .map(({ path, title }) => (
          <Tab
            key={path}
            label={title}
            to={path}
            value={path}
            component={Link}
            onClick={(e) => {
              if (location.pathname === path) e.preventDefault();
            }}
          />
        )),
    [location.pathname],
  );

  // ================ DRAWER ================ //
  const drawer = (
    <>
      <Tabs
        value={location.pathname}
        orientation="vertical"
        className={classes.tabs}
      >
        {tabsToRender}
      </Tabs>
      <Divider />
      {(location.pathname === '/main' || location.pathname === '/') && (
        <SortPanel handleDrawerToggle={handleDrawerToggle} />
      )}
    </>
  );

  // ================ APP ================ //
  return (
    <div className={classes.wrapper}>
      <CssBaseline />

      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Icon iconName="menu" fontSize="large" iconColor="white" />
          </IconButton>
          {route && (
            <Typography variant="h6" noWrap className={classes.appBarHeading}>
              {route.title.toUpperCase()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

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
      <main className={classes.main}>
        <div className={classes.offset} />
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact path={path} component={component} key={path} />
          ))}
        </Switch>
      </main>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(App);
