import React from 'react';
import List from '@material-ui/core/List';
import useStyles from './style';

const TaskList = ({children}) => {
  const classes = useStyles();

  return (
    <List className={classes.padding}>{children}</List>
  );
};

export default TaskList;