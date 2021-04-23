import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isResolvedSelector } from '../store/tasks/selectors';
import { getTasks as getTasksAction } from '../store/tasks/actions';

export default () => {
  const dispatch = useDispatch();

  const getTasks = useCallback(() => dispatch(getTasksAction()), [dispatch]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const isResolved = useSelector(isResolvedSelector);

  return isResolved;
};
