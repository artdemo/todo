import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import List from './List';
import Task from './Task';
import axios from './api';

const useStyles = makeStyles({
  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  paper: {
    padding: '10px',
  },
});

const App = () => {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const readData = () =>
    axios
      .get()
      .then((response) => {
        setTasks(response.data);
        if (isLoading) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.dir(error);
        setLoading(false);
      });

  const createData = (data) =>
    axios
      .post('', data)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.dir(error);
        return error;
      });

  const updateData = (id, data) =>
    axios.put(`${id}`, data).catch((error) => {
      console.dir(error);
      return error;
    });

  const deleteData = (id) =>
    axios
      .delete(`${id}`)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => {
        console.dir(error);
        return error;
      });

  const renderTasks = () =>
    tasks.map(({ id, text, isChecked }) => (
      <li key={id}>
        <Task
          text={text}
          isChecked={isChecked}
          updateData={updateData}
          deleteData={deleteData}
          id={id}
        />
      </li>
    ));

  useEffect(() => {
    readData();
  }, []);

  if (isLoading) {
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
          <Form createData={createData} />
          <List>{renderTasks(tasks)}</List>
        </Paper>
      </Container>
    </>
  );
};

export default App;
