import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isResolvedSelector } from '../store/defaultCategoryId/selectors';
import { getDefaultCategoryId as getDefaultCategoryIdAction } from '../store/defaultCategoryId/actions';

export default () => {
  const dispatch = useDispatch();

  const getDefaultCategoryId = useCallback(
    () => dispatch(getDefaultCategoryIdAction()),
    [dispatch],
  );

  useEffect(() => {
    getDefaultCategoryId();
  }, [getDefaultCategoryId]);

  const isResolved = useSelector(isResolvedSelector);

  return { isResolved };
};
