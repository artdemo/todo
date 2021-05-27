import {
  SET_CATEGORIES,
  SET_CATEGORIES_GET_ERROR,
  ADD_CATEGORY,
  SET_CATEGORY_CREATE_REQUEST,
  SET_CATEGORY_CREATE_ERROR,
  DELETE_CATEGORY,
  SET_CATEGORY_PENDING_STATUS,
  RESET_CATEGORY_PENDING_STATUS,
} from './types';

const initialState = {
  categoryList: [],
  requestStatus: {
    resolvedStatus: null,
    createPendingStatus: false,
    createFailedStatus: null,
    // Array to store id of categories while they are updated or deleted, so to show preloader in the component
    pendingCategories: [],
  },
  defaultCategoryId: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // ================= SET CATEGORIES =============== //
    case SET_CATEGORIES:
      return {
        ...state,
        categoryList: action.data,
        requestStatus: {
          ...state.requestStatus,
          resolvedStatus: true,
        },
      };
    case SET_CATEGORIES_GET_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          resolvedStatus: false,
        },
      };
    // ================= ADD CATEGORY =============== //
    case ADD_CATEGORY:
      return {
        ...state,
        categoryList: [...state.categoryList, action.data],
        requestStatus: {
          ...state.requestStatus,
          createPendingStatus: false,
          createFailedStatus: false,
        },
      };
    case SET_CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          createPendingStatus: true,
          createFailedStatus: null,
        },
      };
    case SET_CATEGORY_CREATE_ERROR:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          createPendingStatus: false,
          createFailedStatus: true,
        },
      };
    // ================= DELETE CATEGORY =============== //
    case DELETE_CATEGORY: {
      return {
        ...state,
        categoryList: state.categoryList.filter(
          (category) => category.id !== action.id,
        ),
      };
    }
    // ================== SWITCH PENDING STATUS =============== //
    case SET_CATEGORY_PENDING_STATUS:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: [
            ...state.requestStatus.pendingCategories,
            action.id,
          ],
        },
      };
    case RESET_CATEGORY_PENDING_STATUS:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          pendingCategories: state.requestStatus.pendingCategories.filter(
            (id) => id !== action.id,
          ),
        },
      };
    default:
      return state;
  }
};
