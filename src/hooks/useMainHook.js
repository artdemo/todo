import { useDispatch, useSelector } from 'react-redux';

import {
  createPendingStatusSelector,
  createFailedStatusSelector,
} from '../store/tasks/selectors';
import { categoryListFlattedSelector } from '../store/categories/selectors';
import { createTask as createTaskAction } from '../store/tasks/actions';

export const useMainHook = () => {
  const dispatch = useDispatch();

  const createPendingStatus = useSelector(createPendingStatusSelector);
  const createFailedStatus = useSelector(createFailedStatusSelector);
  const categoryListFlatted = useSelector(categoryListFlattedSelector);

  const createTask = (task) => dispatch(createTaskAction(task));

  return {
    createPendingStatus,
    createFailedStatus,
    categoryListFlatted,
    createTask,
  };
};
