import axios from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/todos`,
});

export const getAllTasks = () =>
  instance.get().catch((e) => {
    console.dir(e);
    throw e;
  });

export const postNewTask = (data) =>
  instance.post('', data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const putTask = (id, data) =>
  instance.put(`${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const deleteTask = (id) =>
  instance.delete(`${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });
