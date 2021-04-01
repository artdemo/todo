import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Task from './Task';
import useStyles from './style';

const TaskList = ({ tasks, updateData, deleteData }) => {
  const classes = useStyles();

  return (
    <List className={classes.padding}>
      {tasks.map(({ id, text, isChecked }) => (
        <ListItem key={id} className={classes.gutter}>
          <Task
            text={text}
            isChecked={isChecked}
            updateData={updateData}
            deleteData={deleteData}
            id={id}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
