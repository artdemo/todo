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

export const postNewCategory = (data) =>
  instance.post(PATH_TO_CATEGORIES, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const deleteCategory = (id) =>
  instance.delete(`${PATH_TO_CATEGORIES}/${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export const patchCategory = (id, data) =>
  instance.patch(`${PATH_TO_CATEGORIES}/${id}`, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const getRelatedTasks = (categoryId) =>
  instance.get(`${PATH_TO_TASKS}/?categoryId=${categoryId}`).catch((e) => {
    console.dir(e);
    throw e;
  });
