import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, ListItem } from '@material-ui/core';
import TaskList from '../../components/TaskList';
import Task from '../../components/Task';
import Loader from '../../components/Loader';
import useStyles from './style';
import useTaskRequestHook from '../../hooks/useTaskRequestHook';
import { taskListCompletedSelector } from '../../store/tasks/selectors';

const Completed = () => {
  console.log('Completed');

  const classes = useStyles();

  const isResolved = useTaskRequestHook();

  const taskList = useSelector(taskListCompletedSelector);

  if (!isResolved) return <Loader />;

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <TaskList>
            {taskList.map(({ id, text, isCompleted, isFavorite }) => (
              <ListItem key={id} className={classes.gutters}>
                <Task
                  id={id}
                  text={text}
                  isCompleted={isCompleted}
                  isFavorite={isFavorite}
                />
              </ListItem>
            ))}
          </TaskList>
        </Paper>
      </Container>
    </>
  );
};

export default Completed;
