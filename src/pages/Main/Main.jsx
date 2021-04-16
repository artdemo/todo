import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, ListItem } from '@material-ui/core';
import Form from '../../components/Form';
import TaskList from '../../components/TaskList';
import Task from '../../components/Task';
import useStyles from './style';
import useTaskRequestHook from '../../hooks/useTaskRequestHook';
import { taskListFavoriteSelector } from '../../store/tasks/selectors';
import Loader from '../../components/Loader';

const Main = () => {
  console.log('Main');

  const classes = useStyles();

  const isResolved = useTaskRequestHook();

  const taskList = useSelector(taskListFavoriteSelector);

  if (!isResolved) return <Loader />;

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Form />
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

export default Main;
