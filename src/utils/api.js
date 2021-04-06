import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/todos`,
});

const getAllTasks = () =>
  instance.get().catch((e) => {
    console.dir(e);
    throw e;
  });

const postNewTask = (data) =>
  instance.post('', data).catch((e) => {
    console.dir(e);
    throw e;
  });

const putTask = (id, data) =>
  instance.put(`${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

const deleteTask = (id) =>
  instance.delete(`${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export { getAllTasks, postNewTask, putTask, deleteTask };
