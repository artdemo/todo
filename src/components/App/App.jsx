import React, { useMemo, useState } from 'react';
import { withRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
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
import Main from '../../pages/Main';
import Completed from '../../pages/Completed';
import Settings from '../../pages/Settings';
import Error from '../../pages/Error';
import Icon from '../Icon';
import SortPanel from '../SortPanel';
import useStyles from './style';

const tabs = {
  '/': '',
  '/main': 'Main',
  '/completed': 'Completed',
  '/settings': 'Settings',
};

const App = ({ location }) => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ================= TABS ================= //
  const tabsToRender = useMemo(
    () =>
      Object.entries(tabs).map(([to, label]) => (
        <Tab
          key={label}
          label={label}
          to={to}
          value={to}
          component={Link}
          onClick={(e) => {
            if (location.pathname === to) e.preventDefault();
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
      {(location.pathname === '/main' ||
        location.pathname === '/completed') && (
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
          <Typography variant="h6" noWrap className={classes.appBarHeading}>
            {tabs[location.pathname].toUpperCase()}
          </Typography>
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
          <Route exact path="/">
            <Redirect to="/completed" />
          </Route>
          <Route path="/settings" component={Settings} />
          <Route path="/main" component={Main} />
          <Route path="/completed" component={Completed} />
          <Route component={Error} />
        </Switch>
      </main>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(App);
