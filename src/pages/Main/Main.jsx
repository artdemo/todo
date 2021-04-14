import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Form from '../../components/Form';
import TaskList from '../../components/TaskList';
import Task from '../../components/Task';
import useStyles from './style';
import { taskListFavoriteSelector } from '../../store/tasks/selectors';

const Main = () => {
  const classes = useStyles();

  const taskList = useSelector(taskListFavoriteSelector);

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
