import { useDispatch, useSelector } from 'react-redux';

import {
  isCreatePendingSelector,
  isCreateFailedSelector,
} from '../store/tasks/selectors';
import { createTask as createTaskAction } from '../store/tasks/actions';

export default () => {
  const dispatch = useDispatch();
  const isCreatePending = useSelector(isCreatePendingSelector);
  const isCreateFailed = useSelector(isCreateFailedSelector);

  const createTask = (task) => dispatch(createTaskAction(task));

  return {
    isCreatePending,
    isCreateFailed,
    createTask,
  };
};
