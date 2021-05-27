import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resolvedStatusSelector } from '../store/categories/selectors';
import { getCategories as getCategoriesAction } from '../store/categories/actions';

export const useCategoryRequestHook = () => {
  const dispatch = useDispatch();

  const getCategories = useCallback(() => dispatch(getCategoriesAction()), [
    dispatch,
  ]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const resolvedStatus = useSelector(resolvedStatusSelector);

  return { resolvedStatus };
};
