import React from 'react';
import { withRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgress, Tabs, Tab, AppBar } from '@material-ui/core';
import Main from '../../pages/Main';
import Completed from '../../pages/Completed';
import Settings from '../../pages/Settings';
import Error from '../../pages/Error';
import useAppHook from '../../hooks/useAppHook';
import useStyles from './style';

const App = ({ location }) => {
  const isGetPending = useAppHook();

  const classes = useStyles();

  if (isGetPending) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" size={80} />
      </div>
    );
  }

  return (
    <>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={location.pathname} centered>
          <Tab label="Main" component={Link} to="/main" value="/main" />
          <Tab
            label="Completed"
            component={Link}
            to="/completed"
            value="/completed"
          />
          <Tab
            label="Settings"
            component={Link}
            to="/settings"
            value="/settings"
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/completed" />
        </Route>
        <Route path="/main" component={Main} />
        <Route path="/completed" component={Completed} />
        <Route path="/settings" component={Settings} />
        <Route component={Error} />
      </Switch>
    </>
  );
};

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(App);
