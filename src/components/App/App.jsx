import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import Form from '../Form';
import TaskList from '../TaskList';
import Task from '../Task';
import useStyles from './style';
import { getTasks } from '../../store/tasks/actions';

const App = ({ tasks, isGetPending, getTasks }) => {
  const classes = useStyles();

  useEffect(() => {
    getTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            {tasks.map(({ id, text, isChecked }) => (
              <ListItem key={id} className={classes.gutters}>
                <Task id={id} text={text} isChecked={isChecked} />
              </ListItem>
            ))}
          </TaskList>
        </Paper>
      </Container>
    </>
  );
};

const mapStateToProps = ({ taskReducer }) => ({
  tasks: taskReducer.taskList,
  isGetPending: taskReducer.requestStatus.isGetPending,
});

export default connect(mapStateToProps, {
  getTasks,
})(App);
