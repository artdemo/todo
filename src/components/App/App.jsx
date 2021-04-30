import React from 'react';
import { withRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import Main from '../../pages/Main';
import Completed from '../../pages/Completed';
import Settings from '../../pages/Settings';
import Error from '../../pages/Error';
import useStyles from './style';
import SortPanel from '../SortPanel';

const App = ({ location }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={location.pathname} centered>
          <Tab
            label="Main"
            component={Link}
            to="/main"
            value="/main"
            onClick={(e) => {
              if (location.pathname === '/main') e.preventDefault();
            }}
          />
          <Tab
            label="Completed"
            component={Link}
            to="/completed"
            value="/completed"
            onClick={(e) => {
              if (location.pathname === '/completed') e.preventDefault();
            }}
          />
          <Tab
            label="Settings"
            component={Link}
            to="/settings"
            value="/settings"
            onClick={(e) => {
              if (location.pathname === '/settings') e.preventDefault();
            }}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/completed" />
        </Route>
        <Route path="/settings" component={Settings} />
        <Route path={['/main', '/completed']}>
          <SortPanel />
          {location.pathname === '/main' && <Main />}
          {location.pathname === '/completed' && <Completed />}
        </Route>
        <Route path="/main" component={Main} />
        <Route path="/completed" component={Completed} />
        <Route component={Error} />
      </Switch>
    </>
  );
};

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(App);
