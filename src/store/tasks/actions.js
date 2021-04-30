import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_GET_ERROR,
  SET_TASKS_CREATE_REQUEST,
  SET_TASKS_CREATE_ERROR,
  SET_TASKS_MODIFY_START,
  SET_TASKS_MODIFY_FINISH,
  SET_TASKS_SORT_REQUEST,
} from './types';
import {
  getAllTasks,
  postNewTask,
  patchTask,
  deleteTask,
} from '../../utils/api/methods';
import { turnObjectToQuery } from '../../utils/helpers';

export const getTasks = (nextSortObj) => (dispatch, getState) => {
  const { taskReducer } = getState();
  const prevSortObj = taskReducer.resolvedSortState;

  // No need to fetch same data
  if (JSON.stringify(nextSortObj) === JSON.stringify(prevSortObj)) return;

  console.log('Get tasks');

  dispatch({ type: SET_TASKS_SORT_REQUEST });

  const params = turnObjectToQuery(nextSortObj, '_sort', false);

  getAllTasks(params)
    .then((response) => {
      dispatch({
        type: SET_TASKS,
        payload: {
          taskList: response.data,
          nextSortObj,
        },
      });
    })
    .catch(() => {
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
    .then((response) => {
      dispatch({
        type: ADD_TASK,
        payload: response.data,
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
    type: SET_TASKS_MODIFY_START,
    payload: id,
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
        type: SET_TASKS_MODIFY_FINISH,
        payload: id,
      });
    });
};

export const removeTask = (id) => (dispatch) => {
  dispatch({
    type: SET_TASKS_MODIFY_START,
    payload: id,
  });

  deleteTask(id)
    .then(() => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    })
    .finally(() => {
      dispatch({
        type: SET_TASKS_MODIFY_FINISH,
        payload: id,
      });
    });
};
