import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isResolvedSelector } from '../store/categories/selectors';
import { getCategories as getCategoriesAction } from '../store/categories/actions';

export default () => {
  const dispatch = useDispatch();

  const getCategories = useCallback(() => dispatch(getCategoriesAction()), [
    dispatch,
  ]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const isResolved = useSelector(isResolvedSelector);

  return isResolved;
};
