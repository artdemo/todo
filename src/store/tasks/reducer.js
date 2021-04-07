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

const initialState = {
  taskList: [],
  requestStatus: {
    isGetPending: false,
    isCreatePending: false,
    isCreateFailed: null,
    pendingTasks: [],
  },
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS_GET_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isGetPending: true,
        },
      };
    case SET_TASKS_GET_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isGetPending: false,
        },
      };
    case SET_TASKS:
      return {
        ...state,
        taskList: action.payload,
        requestStatus: {
          ...state.requestStatus,
          isGetPending: false,
        },
      };
    case SET_TASKS_CREATE_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: true,
          isCreateFailed: null,
        },
      };
    case SET_TASKS_CREATE_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: false,
          isCreateFailed: true,
        },
      };
    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: false,
          isCreateFailed: false,
        },
      };
    case UPDATE_TASK: {
      const updatedTasks = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );

      return {
        ...state,
        taskList: updatedTasks,
      };
    }
    case SET_TASKS_DELETE_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: [...state.requestStatus.pendingTasks, action.payload],
        },
      };
    case SET_TASKS_DELETE_ERROR: {
      const filteredPendingTasks = state.requestStatus.pendingTasks.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: filteredPendingTasks,
        },
      };
    }
    case DELETE_TASK: {
      const filteredTasks = state.taskList.filter(
        (task) => task.id !== action.payload,
      );

      const filteredPendingTasks = state.requestStatus.pendingTasks.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        taskList: filteredTasks,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: filteredPendingTasks,
        },
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
