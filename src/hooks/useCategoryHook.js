import { useDispatch, useSelector } from 'react-redux';
import {
  markCategoryDefault as markCategoryDefaultAction,
  removeCategory as removeCategoryAction,
} from '../store/categories/actions';
import { isDeletePendingSelector } from '../store/categories/selectors';

export default (id) => {
  const dispatch = useDispatch();
  const isDeletePending = useSelector(isDeletePendingSelector(id));

  const removeCategory = (category) => dispatch(removeCategoryAction(category));
  const markCategoryDefault = (id) => dispatch(markCategoryDefaultAction(id));

  return {
    isDeletePending,
    removeCategory,
    markCategoryDefault,
  };
};
