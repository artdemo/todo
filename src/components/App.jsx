import React, { useState } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import { MenuBar } from './MenuBar';
import { Menu } from './Menu';
import { useStyles } from './App.styles';
import { routes } from '../routes';

const App = ({ location }) => {
  const classes = useStyles();
  // Does the current path match the route
  const route = routes.find(({ path }) => path === location.pathname);
  const title = route ? route.title.toUpperCase() : '';

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <MenuBar title={title} handleDrawerToggle={handleDrawerToggle} />
      <Menu
        locationPathname={location.pathname}
        routes={routes}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
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
