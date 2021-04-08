export const taskListSelector = ({ taskReducer }) => taskReducer.taskList;
export const isGetPendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isGetPending;
export const isCreatePendingSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreatePending;
export const isCreateFailedSelector = ({ taskReducer }) =>
  taskReducer.requestStatus.isCreateFailed;
export const isDeletePendingSelector = (id) => ({ taskReducer }) =>
  taskReducer.requestStatus.pendingTasks.includes(id);
