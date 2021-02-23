import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from './Form';
import List from './List';
import Task from './Task';
import axios from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const readData = () =>
    axios
      .get()
      .then((response) => {
        setTasks(response.data);
        return response;
      })
      .catch((error) => {
        console.dir(error);
        return error;
      })
      .then(() => {
        setLoading(false);
      });

  const createData = (data) =>
    axios
      .post('', data)
      .then(() => readData())
      .catch((error) => {
        console.dir(error);
        return error;
      });

  const updateData = (id, data) =>
    axios
      .put(`${id}`, data)
      .then(() => readData())
      .catch((error) => {
        console.dir(error);
        return error;
      });

  const deleteData = (id) =>
    axios
      .delete(`${id}`)
      .then(() => readData())
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
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Form createData={createData} />
        <List>{renderTasks(tasks)}</List>
      </Paper>
    </Container>
  );
};

export default App;
