import { createSelector } from 'reselect';

export const taskListFavoriteSelector = createSelector(
  ({ taskReducer }) => taskReducer.taskList,
  (taskList) => {
    console.log('Favorite selector');

    return taskList
      .filter((task) => !task.isCompleted)
      .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
  },
);

export const taskListCompletedSelector = createSelector(
  ({ taskReducer }) => taskReducer.taskList,
  (taskList) => {
    console.log('Completed selector');

    return taskList.filter((task) => task.isCompleted);
  },
);

export const isResolvedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isResolved;

export const isCreatePendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreatePending;

export const isCreateFailedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreateFailed;

export const isDeletePendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);
