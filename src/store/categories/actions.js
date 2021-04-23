import {
  SET_CATEGORIES,
  SET_CATEGORIES_GET_REQUEST,
  SET_CATEGORIES_GET_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES_CREATE_REQUEST,
  SET_CATEGORIES_CREATE_ERROR,
  SET_CATEGORIES_DELETE_REQUEST,
  SET_CATEGORIES_DELETE_ERROR,
  SET_DEFAULT,
} from './types';
import {
  getAllCategories,
  postNewCategory,
  deleteCategory,
  patchCategory,
  getRelatedTasks,
} from '../../utils/api/methods';

export const getCategories = () => (dispatch, getState) => {
  const { categoryReducer } = getState();

  // If data was already requested from the server take it from the store
  if (categoryReducer.requestStatus.isResolved) return;

  console.log('Get categories');

  dispatch({
    type: SET_CATEGORIES_GET_REQUEST,
  });

  getAllCategories()
    .then((response) => {
      const categoryList = response.data;

      categoryList.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

      dispatch({
        type: SET_CATEGORIES,
        payload: response.data,
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
    type: SET_CATEGORIES_CREATE_REQUEST,
  });

  postNewCategory(category)
    .then((response) => {
      dispatch({
        type: ADD_CATEGORY,
        payload: response.data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CATEGORIES_CREATE_ERROR,
      });
    });
};

export const removeCategory = (id) => (dispatch, setState) => {
  // Prevent the default category from removing
  const { categoryReducer } = setState();
  const { categoryList } = categoryReducer;
  const categoryToRemove = categoryList.find((category) => category.id === id);
  if (categoryToRemove.isDefault) return;
  // Prepare to remove, set pending flag
  dispatch({
    type: SET_CATEGORIES_DELETE_REQUEST,
    payload: id,
  });
  // Prevent category from removing if it has related tasks
  getRelatedTasks(id)
    .then((response) => {
      if (response.data.length) {
        alert(
          "This category can't be deleted, because it has related tasks.\nYou have to delete this tasks before deleting the category",
        );

        throw new Error();
      }
      return id;
    })
    .then((id) => {
      deleteCategory(id);
    })
    .then(() => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CATEGORIES_DELETE_ERROR,
        payload: id,
      });
    });
};

export const markCategoryDefault = (id) => (dispatch, getState) => {
  // Find an id of category set as default
  const { categoryReducer } = getState();
  const { categoryList } = categoryReducer;
  const defaultCategory = categoryList.find(({ isDefault }) => isDefault);

  dispatch({
    type: SET_CATEGORIES_DELETE_REQUEST,
    payload: id,
  });
  // Reset default status on the server
  patchCategory(id, { isDefault: true })
    .then(() => {
      // If there is no any default category, no need to reset
      if (defaultCategory === undefined) return;

      patchCategory(defaultCategory.id, { isDefault: false });
    })
    .then(() => {
      dispatch({
        type: SET_DEFAULT,
        payload: id,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CATEGORIES_DELETE_ERROR,
        payload: id,
      });
    });
};
