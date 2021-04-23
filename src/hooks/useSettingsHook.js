import { useDispatch, useSelector } from 'react-redux';
import useCategoryRequestHook from './useCategoryRequestHook';
import {
  iconListSelector,
  isCreatePendingSelector,
  isCreateFailedSelector,
  categoryListSelector,
} from '../store/categories/selectors';
import { createCategory as createCategoryAction } from '../store/categories/actions';

export default () => {
  const dispatch = useDispatch();

  const categoryList = useSelector(categoryListSelector);
  const isCreatePending = useSelector(isCreatePendingSelector);
  const isCreateFailed = useSelector(isCreateFailedSelector);
  const { availableIcons, colors } = useSelector(iconListSelector);

  const isResolved = useCategoryRequestHook();

  const createCategory = (category) => dispatch(createCategoryAction(category));

  return {
    categoryList,
    availableIcons,
    colors,
    isCreatePending,
    isCreateFailed,
    createCategory,
    isResolved,
  };
};
