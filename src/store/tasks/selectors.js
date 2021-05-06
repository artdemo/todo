/*eslint-disable*/

import { createSelector } from 'reselect';
import set from '../../utils/set.json';

// Find completed tasks
export const taskListCompletedSelector = createSelector(
  ({ taskReducer }) => taskReducer.taskList,
  (taskList) => taskList.filter((task) => task.isCompleted),
);

// Find uncompleted tasks, favorite tasks goes first
export const taskListFavoriteSelector = createSelector(
  ({ taskReducer }) => taskReducer.taskList,
  (taskList) =>
    taskList
      .filter((task) => !task.isCompleted)
      .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)),
);

// Find icon that matches given category
export const iconSelector = (categoryId) =>
  createSelector(
    ({ categoryReducer }) => categoryReducer.categoryList,
    (categoryList) => {
      const category = categoryList.find(({ id }) => id === categoryId);

      return category ? category.icon : null;
    },
  );

export const usedColorsSelector = createSelector(
  ({ taskReducer }) => taskReducer.taskList,
  (taskList) => {
    // Create object from colors array to store an amount of used colors
    const { colors } = set;
    const colorObj = Object.fromEntries(colors.map((color) => [color, 0]));
    // Count all used colors
    taskList.forEach(({ color }) => {
      colorObj[color] += 1;
    });

    return colorObj;
  },
);

export const isResolvedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isResolved;

export const isCreatePendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreatePending;

export const isCreateFailedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreateFailed;

export const isModifyPendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);

export const isSortPendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isSortPending;

export const queryParamsSelector = ({ taskReducer }) => taskReducer.queryParams;
// Get sort object from sort query string
export const sortObjSelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams._sort,
  (sortQuery) => {
    const template = {
      date: false,
      name: false,
    };

    if (sortQuery === '') return template;

    const sortObj = sortQuery
      .split(',')
      .reduce((obj, key) => ({ ...obj, [key]: true }), template);

    return sortObj;
  },
);

export const filterColorArraySelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams.color,
  (color) => (Array.isArray(color) ? color : [color]),
);

export const filterCategoryArraySelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams.categoryId,
  (categoryId) => (Array.isArray(categoryId) ? categoryId : [categoryId]),
);
