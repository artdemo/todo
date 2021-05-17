import {
  SET_DEFAULT_CATEGORY_ID,
  SET_DEFAULT_CATEGORY_ID_ERROR,
  SET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
  RESET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
} from './types';
import {
  getDefaultCategoryId as getDefaultCategoryIdRequest,
  putDefaultCategoryId,
} from '../../utils/api/methods';

export const getDefaultCategoryId = () => (dispatch) => {
  getDefaultCategoryIdRequest()
    .then(({ data }) => {
      const { id } = data;

      dispatch({
        type: SET_DEFAULT_CATEGORY_ID,
        id,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_DEFAULT_CATEGORY_ID_ERROR,
      });
    });
};

export const setDefaultCategoryId = (id) => (dispatch) => {
  dispatch({
    type: SET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
    id,
  });

  putDefaultCategoryId({ id })
    .then(() => {
      dispatch({
        type: SET_DEFAULT_CATEGORY_ID,
        id,
      });
    })
    .finally(() => {
      dispatch({
        type: RESET_DEFAULT_CATEGORY_ID_PENDING_STATUS,
      });
    });
};
