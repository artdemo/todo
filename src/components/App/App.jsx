import React, { useMemo } from 'react';
import { withRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Drawer,
  Hidden,
  CssBaseline,
  Divider,
} from '@material-ui/core';
import Main from '../../pages/Main';
import Completed from '../../pages/Completed';
import Settings from '../../pages/Settings';
import Error from '../../pages/Error';
import SortPanel from '../SortPanel';
import useStyles from './style';

const tabs = [
  { label: 'Main', to: '/main' },
  { label: 'Completed', to: '/completed' },
  { label: 'Settings', to: '/settings' },
];

const App = ({ location }) => {
  const classes = useStyles();

  const tabsToRender = useMemo(
    () =>
      tabs.map(({ label, to }) => (
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

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
        >
          <Tabs
            value={location.pathname}
            orientation="vertical"
            className={classes.tabs}
          >
            {tabsToRender}
          </Tabs>
          <Divider />
          {(location.pathname === '/main' ||
            location.pathname === '/completed') && <SortPanel />}
        </Drawer>
      </Hidden>
      <main className={`${classes.main} mainContent`}>
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
