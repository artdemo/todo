import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  isCreatePendingSelector,
  isCreateFailedSelector,
  taskListFavoriteSelector,
  isResolvedSelector as isTasksResolvedSelector,
} from '../store/tasks/selectors';
import useCategoryRequestHook from './useCategoryRequestHook';
import { categoryListFlatSelector } from '../store/categories/selectors';
import { createTask as createTaskAction } from '../store/tasks/actions';

export default () => {
  const dispatch = useDispatch();

  const isCreatePending = useSelector(isCreatePendingSelector);
  const isCreateFailed = useSelector(isCreateFailedSelector);
  const categoryListFlat = useSelector(categoryListFlatSelector);
  const taskList = useSelector(taskListFavoriteSelector);

  const isTasksResolved = useSelector(isTasksResolvedSelector);
  const isCategoriesResolved = useCategoryRequestHook();

  const createTask = useCallback((task) => dispatch(createTaskAction(task)), [
    dispatch,
  ]);

  return {
    isCreatePending,
    isCreateFailed,
    categoryListFlat,
    taskList,
    isTasksResolved,
    isCategoriesResolved,
    createTask,
  };
};
