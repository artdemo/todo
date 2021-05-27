import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resolvedStatusSelector } from '../store/defaultCategoryId/selectors';
import { getDefaultCategoryId as getDefaultCategoryIdAction } from '../store/defaultCategoryId/actions';

export const useDefaultCategoryIdRequestHook = () => {
  const dispatch = useDispatch();

  const getDefaultCategoryId = useCallback(
    () => dispatch(getDefaultCategoryIdAction()),
    [dispatch],
  );

  useEffect(() => {
    getDefaultCategoryId();
  }, [getDefaultCategoryId]);

  const resolvedStatus = useSelector(resolvedStatusSelector);

  return { resolvedStatus };
};
