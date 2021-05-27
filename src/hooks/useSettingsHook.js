import { useDispatch, useSelector } from 'react-redux';
import { useCategoryRequestHook } from './useCategoryRequestHook';
import { useDefaultCategoryIdRequestHook } from './useDefaultCategoryIdRequestHook';
import {
  iconListSelector,
  createPendingStatusSelector,
  createFailedStatusSelector,
  categoryListSelector,
} from '../store/categories/selectors';
import { createCategory as createCategoryAction } from '../store/categories/actions';

export const useSettingsHook = () => {
  const dispatch = useDispatch();

  const { resolvedStatus: isCategoryResolved } = useCategoryRequestHook();

  const {
    resolvedStatus: isDefaultCategoryIdResolved,
  } = useDefaultCategoryIdRequestHook();

  const categoryList = useSelector(categoryListSelector);
  const createPendingStatus = useSelector(createPendingStatusSelector);
  const createFailedStatus = useSelector(createFailedStatusSelector);
  const { availableIcons, colors } = useSelector(iconListSelector);

  const createCategory = (category) => dispatch(createCategoryAction(category));

  return {
    categoryList,
    availableIcons,
    colors,
    createPendingStatus,
    createFailedStatus,
    resolvedStatus: isCategoryResolved && isDefaultCategoryIdResolved,
    createCategory,
  };
};
