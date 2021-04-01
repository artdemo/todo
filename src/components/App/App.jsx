import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../Form';
import TaskList from '../TaskList';
import useStyles from './style';
import { getAllTasks, postNewTask, putTask, deleteTask } from '../../utils/api';

const App = () => {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const readData = () =>
    getAllTasks()
      .then((response) => {
        setTasks(response.data);

        if (isLoading) {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });

  const createData = (data) =>
    postNewTask(data)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        return error;
      });

  const updateData = (id, data) =>
    putTask(id, data).catch((error) => {
      return error;
    });

  const deleteData = (id) =>
    deleteTask(id)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => {
        return error;
      });

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
          <TaskList
            tasks={tasks}
            updateData={updateData}
            deleteData={deleteData}
          />
        </Paper>
      </Container>
    </>
  );
};

export default App;
