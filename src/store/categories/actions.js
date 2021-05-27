import {
  SET_CATEGORIES,
  SET_CATEGORIES_GET_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORY_CREATE_REQUEST,
  SET_CATEGORY_CREATE_ERROR,
  SET_CATEGORY_PENDING_STATUS,
  RESET_CATEGORY_PENDING_STATUS,
} from './types';
import {
  getCategories as getCategoriesRequest,
  postCategory,
  deleteCategory,
  getRelatedTasks,
} from '../../utils/api/methods';

export const getCategories = () => (dispatch, getState) => {
  const { categoryReducer } = getState();
  // If data was already requested from the server take it from the store
  if (categoryReducer.requestStatus.isResolved) return;

  getCategoriesRequest()
    .then(({ data }) => {
      data.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

      dispatch({
        type: SET_CATEGORIES,
        data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CATEGORIES_GET_ERROR,
      });
    });
};

export const createCategory = (category) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_CREATE_REQUEST,
  });

  postCategory(category)
    .then(({ data }) => {
      dispatch({
        type: ADD_CATEGORY,
        data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CATEGORY_CREATE_ERROR,
      });
    });
};

export const removeCategory = (id) => (dispatch, setState) => {
  // Prevent the default category from removing
  const { categoryReducer } = setState();
  const { categoryList } = categoryReducer;
  const categoryToRemove = categoryList.find((category) => category.id === id);

  if (categoryToRemove.isDefault) return;
  // Show preloader
  dispatch({
    type: SET_CATEGORY_PENDING_STATUS,
    id,
  });
  // Prevent category from removing if it has related tasks
  getRelatedTasks(id)
    .then(({ data }) => {
      if (data.length) throw new Error();

      return deleteCategory(id);
    })
    .then(() => {
      dispatch({
        type: DELETE_CATEGORY,
        id,
      });
    })
    .catch(() => {
      alert(
        "This category can't be deleted, because it has related tasks.\nYou have to delete this tasks before deleting the category",
      );
    })
    .finally(() => {
      dispatch({
        type: RESET_CATEGORY_PENDING_STATUS,
        id,
      });
    });
};
