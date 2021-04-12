import instance from './instance';

const PATH = '/todos';

export const getAllTasks = () =>
  instance.get(PATH).catch((e) => {
    console.dir(e);
    throw e;
  });

export const postNewTask = (data) =>
  instance.post(PATH, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const patchTask = (id, data) =>
  instance.patch(`${PATH}/${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const deleteTask = (id) =>
  instance.delete(`${PATH}/${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });
