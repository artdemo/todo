import { useDispatch, useSelector } from 'react-redux';
import { useCategoryRequestHook } from './useCategoryRequestHook';
import { useDefaultCategoryIdRequestHook } from './useDefaultCategoryIdRequestHook';
import {
  iconListSelector,
  isCreatePendingSelector,
  isCreateFailedSelector,
  categoryListSelector,
} from '../store/categories/selectors';
import { createCategory as createCategoryAction } from '../store/categories/actions';

export const useSettingsHook = () => {
  const dispatch = useDispatch();

  const { isResolved: isCategoryResolved } = useCategoryRequestHook();

  const {
    isResolved: isDefaultCategoryIdResolved,
  } = useDefaultCategoryIdRequestHook();

  const categoryList = useSelector(categoryListSelector);
  const isCreatePending = useSelector(isCreatePendingSelector);
  const isCreateFailed = useSelector(isCreateFailedSelector);
  const { availableIcons, colors } = useSelector(iconListSelector);

  const createCategory = (category) => dispatch(createCategoryAction(category));

  return {
    categoryList,
    availableIcons,
    colors,
    isCreatePending,
    isCreateFailed,
    isResolved: isCategoryResolved && isDefaultCategoryIdResolved,
    createCategory,
  };
};
