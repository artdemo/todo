import React, { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import Task from './Task';
import axios from './api.js';

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

  return (
    <div>
      <Form createData={createData} />
      <List>{renderTasks(tasks)}</List>
    </div>
  );
};

export default App;
