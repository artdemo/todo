export const taskListFavoriteSelector = ({ taskReducer }) =>
  taskReducer.taskList
    .filter((task) => !task.isCompleted)
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
export const taskListCompletedSelector = ({ taskReducer }) =>
  taskReducer.taskList.filter((task) => task.isCompleted);
export const isGetPendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isGetPending;
export const isCreatePendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreatePending;
export const isCreateFailedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreateFailed;
export const isDeletePendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);
