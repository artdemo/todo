import { createSelector } from 'reselect';
import set from '../../utils/set.json';

// =============== MAIN PAGE & COMPLETED PAGE SELECTORS ================= //

export const taskListSelector = ({ taskReducer }) => taskReducer.taskList;

export const totalCountSelector = ({ taskReducer }) => taskReducer.totalCount;

export const resolvedStatusSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.resolvedStatus;

export const createPendingStatusSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.createPendingStatus;

export const createFailedStatusSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.createFailedStatus;

export const queryParamsSelector = ({ taskReducer }) => taskReducer.queryParams;

// ========================= TASK SELECTORS ====================== //

// Find icon that matches given category
export const iconSelector = (categoryId) =>
  createSelector(
    ({ categoryReducer }) => categoryReducer.categoryList,
    (categoryList) => {
      const category = categoryList.find(({ id }) => id === categoryId);

      return category ? category.icon : null;
    },
  );

export const isModifyPendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);

// ====================== SORT PANEL SELECTORS ====================== //
// Return an object { color: count } for SortPanel
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

// Get sort object from sort query string
export const sortObjSelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams._sort,
  (sortQuery) => {
    const sortObj = sortQuery
      .split(',')
      .reduce((obj, key) => ({ ...obj, [key]: true }), {});

    const { date = false, name = false } = sortObj;

    return { date, name };
  },
);

// Get colors array from query
export const filterColorArraySelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams.color,
  (color) => (Array.isArray(color) ? color : [color]),
);

// Get categories array from query
export const filterCategoryArraySelector = createSelector(
  ({ taskReducer }) => taskReducer.queryParams.categoryId,
  (categoryId) => (Array.isArray(categoryId) ? categoryId : [categoryId]),
);
