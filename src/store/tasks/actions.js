import {
  SET_TASKS,
  ADD_TASK,
  ADD_PAGE,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_GET_ERROR,
  SET_TASKS_CREATE_REQUEST,
  SET_TASKS_CREATE_ERROR,
  SET_TASK_PENDING_STATUS,
  RESET_TASK_PENDING_STATUS,
  SET_PARAMS,
} from './types';
import {
  getTasks as getTasksRequest,
  postNewTask,
  patchTask,
  deleteTask,
} from '../../utils/api/methods';

export const getTasks = () => (dispatch, getState) => {
  const { taskReducer } = getState();
  const { queryParams } = taskReducer;

  console.log('Get Task');

  getTasksRequest(queryParams)
    .then((response) => {
      if (!response) return;

      const totalCount = response.headers['x-total-count'];

      dispatch({
        type: SET_TASKS,
        payload: { taskList: response.data, totalCount },
        taskList: response.data,
        totalCount,
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: SET_TASKS_GET_ERROR,
      });
    });
};

export const createTask = (task) => (dispatch) => {
  dispatch({
    type: SET_TASKS_CREATE_REQUEST,
  });

  postNewTask(task)
    .then(({ data }) => {
      dispatch({
        type: ADD_TASK,
        data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_TASKS_CREATE_ERROR,
      });
    });
};

export const updateTask = (id, data) => (dispatch) => {
  dispatch({
    type: SET_TASK_PENDING_STATUS,
    id,
  });

  return patchTask(id, data)
    .then(() => {
      dispatch({
        type: UPDATE_TASK,
        id,
        data,
      });
    })
    .catch((e) => {
      alert('Something went wrong during request!\nTry again.');
      throw e;
    })
    .finally(() => {
      dispatch({
        type: RESET_TASK_PENDING_STATUS,
        id,
      });
    });
};

export const removeTask = (id) => (dispatch) => {
  dispatch({
    type: SET_TASK_PENDING_STATUS,
    id,
  });

  deleteTask(id)
    .then(() => {
      dispatch({
        type: DELETE_TASK,
        id,
      });
    })
    .finally(() => {
      dispatch({
        type: RESET_TASK_PENDING_STATUS,
        id,
      });
    });
};

export const setParams = (params) => ({
  type: SET_PARAMS,
  params,
});

export const addPage = { type: ADD_PAGE };
