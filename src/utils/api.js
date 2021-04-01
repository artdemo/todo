import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getAllTasks = () =>
  instance.get('todos').catch((e) => {
    console.dir(e);
    throw e;
  });

const postNewTask = (data) =>
  instance.post('todos', data).catch((e) => {
    console.dir(e);
    throw e;
  });

const putTask = (id, data) =>
  instance.put(`todos/${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

const deleteTask = (id) =>
  instance.delete(`todos/${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export { getAllTasks, postNewTask, putTask, deleteTask };
