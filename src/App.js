import React, { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import Task from './Task';
import axios from './api.js';

const renderTasks = (tasks) =>
  tasks.map(({ id, text, isChecked }) => (
    <li key={id}>
      <Task text={text} isChecked={isChecked} />
    </li>
  ));

const App = () => {
  const [tasks, setTasks] = useState([]);

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
      .put(`${id}`)
      .then(() => readData())
      .catch((error) => {
        console.dir(error);
        return error;
      });

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <Form />
      <List>{renderTasks(tasks)}</List>
    </div>
  );
};

export default App;
