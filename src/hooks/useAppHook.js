import { useEffect } from 'react';
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

  const getTasks = () => dispatch(getTasksAction());

  useEffect(() => {
    getTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    taskList,
    isGetPending,
  };
};
