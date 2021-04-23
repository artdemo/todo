import { createSelector } from 'reselect';

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

export const isResolvedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isResolved;

export const isCreatePendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreatePending;

export const isCreateFailedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreateFailed;

export const isModifyPendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);
