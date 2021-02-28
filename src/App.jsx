import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from './Form';
import List from './List';
import Task from './Task';
import Error from './Error';
import axios from './api';

const errorMessages = {
  read:
    'It seems you are offline or something went wrong during request. Please reload the page.',
  create: 'Something went wrong during request. Please try again.',
  delete: "We can't delete your task now. Please try again later",
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorState, setError] = useState({ isError: false, errorMsg: '' });

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
        setError({
          isError: true,
          errorMsg: errorMessages.read,
        });
      });

  const createData = (data) =>
    axios
      .post('', data)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.dir(error);
        setError({ isError: true, errorMsg: errorMessages.create });
        return error;
      });

  const updateData = (id, data) =>
    axios.put(`${id}`, data).catch((error) => {
      console.dir(error);
      setError({ isError: true, errorMsg: errorMessages.create });
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
        setError({ isError: true, errorMsg: errorMessages.delete });
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
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress color="secondary" size={80} />
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Form createData={createData} />
          <List>{renderTasks(tasks)}</List>
        </Paper>
      </Container>
      <Error errorState={errorState} setError={setError} />
    </>
  );
};

export default App;
