import {
  SET_DEFAULT_CATEGORY_ID,
  SET_DEFAULT_CATEGORY_ID_ERROR,
  SET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
  RESET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
} from './types';

const initialState = {
  defaultCategoryId: 7,
  isResolved: false,
  pendingCategory: null,
};

export const defaultCategoryIdReducer = (
  state = initialState,
  { type, id },
) => {
  switch (type) {
    case SET_DEFAULT_CATEGORY_ID:
      return {
        ...state,
        defaultCategoryId: id,
        isResolved: true,
      };
    case SET_DEFAULT_CATEGORY_ID_ERROR:
      return {
        ...state,
        isResolved: false,
      };
    case SET_DEFAULT_CATEGORY_ID_PENDING_STATUS:
      return {
        ...state,
        pendingCategory: id,
      };
    case RESET_DEFAULT_CATEGORY_ID_PENDING_STATUS:
      return {
        ...state,
        pendingCategory: null,
      };
    default:
      return state;
  }
};