import { useDispatch, useSelector } from 'react-redux';
import { removeCategory as removeCategoryAction } from '../store/categories/actions';

import { setDefaultCategoryId as setDefaultCategoryIdAction } from '../store/defaultCategoryId/actions';

import { isDeletePendingSelector } from '../store/categories/selectors';
import {
  isDefaultSelectCategoryor,
  isSetDefaultPendingSelector,
} from '../store/defaultCategoryId/selectors';

export const useCategoryHook = (id) => {
  const dispatch = useDispatch();
  const isDeletePending = useSelector(isDeletePendingSelector(id));
  const isSetDefaultPending = useSelector(isSetDefaultPendingSelector(id));
  const isDefault = useSelector(isDefaultSelectCategoryor(id));

  const removeCategory = (category) => dispatch(removeCategoryAction(category));
  const setDefaultCategoryId = (id) => dispatch(setDefaultCategoryIdAction(id));

  return {
    isDefault,
    isDeletePending,
    isSetDefaultPending,
    removeCategory,
    setDefaultCategoryId,
  };
};
