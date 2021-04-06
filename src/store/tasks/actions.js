import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_GET_REQUEST,
  SET_TASKS_GET_ERROR,
  SET_TASKS_CREATE_REQUEST,
  SET_TASKS_CREATE_ERROR,
  SET_TASKS_DELETE_REQUEST,
  SET_TASKS_DELETE_ERROR,
} from './types';
import { getAllTasks, postNewTask, putTask, deleteTask } from '../../utils/api';

export const getTasks = () => (dispatch) => {
  dispatch({
    type: SET_TASKS_GET_REQUEST,
  });

  getAllTasks().then(
    (response) => {
      dispatch({
        type: SET_TASKS,
        payload: response.data,
      });
    },
    () => {
      dispatch({
        type: SET_TASKS_GET_ERROR,
      });
    },
  );
};

export const createTask = (task) => (dispatch) => {
  dispatch({
    type: SET_TASKS_CREATE_REQUEST,
  });

  postNewTask(task).then(
    (response) => {
      dispatch({
        type: ADD_TASK,
        payload: response.data,
      });
    },
    () => {
      dispatch({
        type: SET_TASKS_CREATE_ERROR,
      });
    },
  );
};

export const updateTask = (task) => (dispatch) => {
  // First change user interface
  dispatch({
    type: UPDATE_TASK,
    payload: task,
  });
  // Then send to the server
  putTask(task.id, task);
};

export const removeTask = (id) => (dispatch) => {
  dispatch({
    type: SET_TASKS_DELETE_REQUEST,
    payload: id,
  });

  deleteTask(id).then(
    () => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    },
    () => {
      dispatch({
        type: SET_TASKS_DELETE_ERROR,
        payload: id,
      });
    },
  );
};
