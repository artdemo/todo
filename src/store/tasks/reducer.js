import {
  SET_TASKS,
  ADD_PAGE,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_GET_ERROR,
  SET_TASKS_CREATE_REQUEST,
  SET_TASKS_CREATE_ERROR,
  SET_TASK_PENDING_STATUS,
  RESET_TASK_PENDING_STATUS,
  SET_PARAMS,
} from './types';

const initialState = {
  taskList: [],
  totalCount: 0,
  queryParams: {
    _sort: '',
    categoryId: [],
    color: [],
    _start: 0,
    _limit: `${process.env.REACT_APP_PAGE_LIMIT}`,
    _order: 'desc',
    isCompleted: false,
  },
  requestStatus: {
    isCreatePending: false,
    isCreateFailed: null,
    isResolved: null,
    // Array to store id of tasks while they are updated or deleted, so to show preloader in the component
    pendingTasks: [],
  },
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // ================= GET TASKS =============== //
    case SET_TASKS: {
      const taskList = [...state.taskList];
      // Just created tasks are already placed on the top of the list, no need to show them again
      action.taskList.forEach((newTask) => {
        if (taskList.find((oldTask) => oldTask.id === newTask.id)) return;
        taskList.push(newTask);
      });

      return {
        ...state,
        taskList,
        totalCount: +action.totalCount,
        requestStatus: {
          ...state.requestStatus,
          isResolved: true,
        },
      };
    }
    case ADD_PAGE:
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          _start: +state.queryParams._start + +state.queryParams._limit,
        },
      };
    case SET_PARAMS: {
      const newQueryParams = { ...state.queryParams, ...action.params };

      if (!newQueryParams._sort.includes('isFavorite'))
        newQueryParams._sort = `isFavorite,${newQueryParams._sort}`;

      return {
        ...state,
        taskList: [],
        queryParams: newQueryParams,
        requestStatus: { ...state.requestStatus, isResolved: null },
      };
    }
    case SET_TASKS_GET_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isResolved: false,
        },
      };
    // ================ CREATE TASK ================= //
    case ADD_TASK: {
      return {
        ...state,
        taskList: [action.data, ...state.taskList],
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: false,
          isCreateFailed: false,
        },
      };
    }
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
    // ================= UPDATE TASK ================ //
    case UPDATE_TASK: {
      const updatedTasks =
        'isCompleted' in action.data
          ? state.taskList.filter((task) => task.id !== action.id)
          : state.taskList
              .map((task) =>
                task.id === action.id ? { ...task, ...action.data } : task,
              )
              .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

      return {
        ...state,
        taskList: updatedTasks,
      };
    }
    // =================== DELETE TASK ================== //
    case DELETE_TASK: {
      // Set offset so not jump over one task
      const { queryParams } = state;
      queryParams._start -= 1;

      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.id),
        totalCount: state.totalCount - 1,
      };
    }
    // ================ SWITCH PENDING STATUS ============== //
    case SET_TASK_PENDING_STATUS:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: [...state.requestStatus.pendingTasks, action.id],
        },
      };
    case RESET_TASK_PENDING_STATUS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingTasks: state.requestStatus.pendingTasks.filter(
            (id) => id !== action.id,
          ),
        },
      };
    }
    default:
      return state;
  }
};
