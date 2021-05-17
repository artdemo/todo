import axios from 'axios';
import instance from './instance';

const PATH_TO_TASKS = '/todos';
const PATH_TO_CATEGORIES = '/categories';
const PATH_TO_DEFAULT_CATEGORY_ID = '/default_category';

let cancel;

export const cancelRequest = () => cancel();

export const getTasks = (params) =>
  instance
    .get(PATH_TO_TASKS, {
      params,
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;

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

export const getCategories = () =>
  instance.get(PATH_TO_CATEGORIES).catch((e) => {
    console.dir(e);
    throw e;
  });

export const postCategory = (data) =>
  instance.post(PATH_TO_CATEGORIES, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const deleteCategory = (id) =>
  instance.delete(`${PATH_TO_CATEGORIES}/${id}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export const getRelatedTasks = (categoryId) =>
  instance.get(`${PATH_TO_TASKS}/?categoryId=${categoryId}`).catch((e) => {
    console.dir(e);
    throw e;
  });

export const putDefaultCategoryId = (data) =>
  instance.put(PATH_TO_DEFAULT_CATEGORY_ID, data).catch((e) => {
    console.dir(e);
    throw e;
  });

export const getDefaultCategoryId = () =>
  instance.get(PATH_TO_DEFAULT_CATEGORY_ID).catch((e) => {
    console.dir(e);
    throw e;
  });
