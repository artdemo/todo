import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import useStyles from './style';

const TaskList = ({ children }) => {
  const classes = useStyles();

  return <List className={classes.padding}>{children}</List>;
};

TaskList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

TaskList.defaultProps = {
  children: null,
};

export default TaskList;
