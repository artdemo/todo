import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  taskListSelector,
  isGetPendingSelector,
} from '../store/tasks/selectors';
import { getTasks as getTasksAction } from '../store/tasks/actions';

export default () => {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);
  const isGetPending = useSelector(isGetPendingSelector);

  const getTasks = useCallback(() => dispatch(getTasksAction()), [dispatch]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return {
    taskList,
    isGetPending,
  };
};
