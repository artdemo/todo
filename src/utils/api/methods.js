import instance from './instance';

const PATH_TO_TASKS = '/todos';
const PATH_TO_CATEGORIES = '/categories';

export const getAllTasks = () =>
  instance.get(PATH_TO_TASKS).catch((e) => {
    console.dir(e);
    throw e;
  });

export const postNewTask = (data) =>
  instance.post(PATH_TO_TASKS, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const patchTask = (id, data) =>
  instance.patch(`${PATH_TO_TASKS}/${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const deleteTask = (id) =>
  instance.delete(`${PATH_TO_TASKS}/${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export const getAllCategories = () =>
  instance.get(PATH_TO_CATEGORIES).catch((e) => {
    console.dir(e);
    throw e;
  });
