import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import Form from '../Form';
import TaskList from '../TaskList';
import Task from '../Task';
import useStyles from './style';
import useAppHook from '../../hooks/useAppHook';

const App = () => {
  const classes = useStyles();

  const { taskList, isGetPending } = useAppHook();

  taskList.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

  if (isGetPending) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" size={80} />
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Form />
          <TaskList>
            {taskList.map(({ id, text, isChecked, isFavorite }) => (
              <ListItem key={id} className={classes.gutters}>
                <Task
                  id={id}
                  text={text}
                  isChecked={isChecked}
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

export default App;
