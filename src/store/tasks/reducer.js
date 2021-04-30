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

const initialState = {
  taskList: [],
  resolvedSortState: {},
  requestStatus: {
    isCreatePending: false,
    isCreateFailed: null,
    isSortPending: false,
    isResolved: null,
    pendingTasks: [],
  },
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // ================= GET REQUEST =============== //
    case SET_TASKS:
      return {
        ...state,
        taskList: action.payload.taskList,
        resolvedSortState: action.payload.nextSortObj,
        requestStatus: {
          ...state.requestStatus,
          isResolved: true,
          isSortPending: false,
        },
      };
    case SET_TASKS_SORT_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isSortPending: true,
        },
      };
    case SET_TASKS_GET_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isResolved: false,
          isSortPending: false,
        },
      };
    // ================ CREATE REQUEST ================= //
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
    // ================= UPDATE REQUEST ================ //
    case UPDATE_TASK: {
      const updatedTasks = state.taskList.map((task) =>
        task.id === action.id ? { ...task, ...action.data } : task,
      );

      return {
        ...state,
        taskList: updatedTasks,
      };
    }
    case SET_TASKS_MODIFY_START:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: [...state.requestStatus.pendingTasks, action.payload],
        },
      };
    case SET_TASKS_MODIFY_FINISH: {
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
    // =================== DELETE REQUEST ================== //
    case DELETE_TASK: {
      const filteredTasks = state.taskList.filter(
        (task) => task.id !== action.payload,
      );
      return {
        ...state,
        taskList: filteredTasks,
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
