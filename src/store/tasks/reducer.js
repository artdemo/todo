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
  data: [],
  requests: {
    isGetPending: false,
    isCreatePending: false,
    isCreateFailed: null,
    pendingTasks: [],
  },
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS_GET_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          isGetPending: true,
        },
      };
    case SET_TASKS_GET_ERROR:
      return {
        ...state,
        requests: {
          ...state.requests,
          isGetPending: false,
        },
      };
    case SET_TASKS:
      return {
        ...state,
        data: action.payload,
        requests: {
          ...state.requests,
          isGetPending: false,
        },
      };
    case SET_TASKS_CREATE_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          isCreatePending: true,
          isCreateFailed: null,
        },
      };
    case SET_TASKS_CREATE_ERROR:
      return {
        ...state,
        requests: {
          ...state.requests,
          isCreatePending: false,
          isCreateFailed: true,
        },
      };
    case ADD_TASK:
      return {
        ...state,
        data: [...state.data, action.payload],
        requests: {
          ...state.requests,
          isCreatePending: false,
          isCreateFailed: false,
        },
      };
    case UPDATE_TASK: {
      const updatedTasks = state.data.map((task) => {
        if (task.id === action.payload.id) return action.payload;

        return task;
      });

      return {
        ...state,
        data: updatedTasks,
      };
    }
    case SET_TASKS_DELETE_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          pendingTasks: [...state.requests.pendingTasks, action.payload],
        },
      };
    case SET_TASKS_DELETE_ERROR: {
      const filteredPendingTasks = state.requests.pendingTasks.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        requests: {
          ...state.requests,
          pendingTasks: filteredPendingTasks,
        },
      };
    }
    case DELETE_TASK: {
      const filteredTasks = state.data.filter(
        (task) => task.id !== action.payload,
      );

      const filteredPendingTasks = state.requests.pendingTasks.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        data: filteredTasks,
        requests: {
          ...state.requests,
          pendingTasks: filteredPendingTasks,
        },
      };
    }
    default:
      return state;
  }
};

export default tasks;
