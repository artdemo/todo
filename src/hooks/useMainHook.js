import { useDispatch, useSelector } from 'react-redux';

import {
  isCreatePendingSelector,
  isCreateFailedSelector,
} from '../store/tasks/selectors';
import { categoryListFlattedSelector } from '../store/categories/selectors';
import { createTask as createTaskAction } from '../store/tasks/actions';

export const useMainHook = () => {
  const dispatch = useDispatch();

  const isCreatePending = useSelector(isCreatePendingSelector);
  const isCreateFailed = useSelector(isCreateFailedSelector);
  const categoryListFlatted = useSelector(categoryListFlattedSelector);

  const createTask = (task) => dispatch(createTaskAction(task));

  return {
    isCreatePending,
    isCreateFailed,
    categoryListFlatted,
    createTask,
  };
};
