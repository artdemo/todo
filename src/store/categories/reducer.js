import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES_GET_REQUEST,
  SET_CATEGORIES_GET_ERROR,
  SET_CATEGORIES_CREATE_REQUEST,
  SET_CATEGORIES_CREATE_ERROR,
  SET_CATEGORIES_DELETE_REQUEST,
  SET_CATEGORIES_DELETE_ERROR,
  SET_DEFAULT,
} from './types';

const initialState = {
  categoryList: [],
  requestStatus: {
    isResolved: false,
    isCreatePending: false,
    isCreateFailed: null,
    pendingCategories: [],
  },
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
        },
      };
    case SET_CATEGORIES_GET_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isResolved: true,
        },
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload,
        requestStatus: {
          ...state.requestStatus,
          isResolved: true,
        },
      };
    case SET_CATEGORIES_CREATE_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: true,
          isCreateFailed: null,
        },
      };
    case SET_CATEGORIES_CREATE_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: false,
          isCreateFailed: true,
        },
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categoryList: [...state.categoryList, action.payload],
        requestStatus: {
          ...state.requestStatus,
          isCreatePending: false,
          isCreateFailed: false,
        },
      };
    case SET_CATEGORIES_DELETE_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: [
            ...state.requestStatus.pendingCategories,
            action.payload,
          ],
        },
      };
    case SET_CATEGORIES_DELETE_ERROR: {
      const filteredPendingTasks = state.requestStatus.pendingCategories.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: filteredPendingTasks,
        },
      };
    }
    case DELETE_CATEGORY: {
      const filteredCategories = state.categoryList.filter(
        (category) => category.id !== action.payload,
      );

      const filteredPendingCategories = state.requestStatus.pendingCategories.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        categoryList: filteredCategories,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: filteredPendingCategories,
        },
      };
    }
    case SET_DEFAULT: {
      const updatedCategories = state.categoryList.map((category) =>
        category.id === action.payload
          ? { ...category, isDefault: true }
          : { ...category, isDefault: false },
      );
      // Sort updated categories to show default one on the top of the list
      updatedCategories.sort(
        (a, b) => Number(b.isDefault) - Number(a.isDefault),
      );

      const filteredPendingCategories = state.requestStatus.pendingCategories.filter(
        (id) => id !== action.payload,
      );

      return {
        ...state,
        categoryList: updatedCategories,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: filteredPendingCategories,
        },
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
