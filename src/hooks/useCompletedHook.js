import { useSelector } from 'react-redux';
import {
  taskListCompletedSelector,
  isResolvedSelector as isTasksResolvedSelector,
} from '../store/tasks/selectors';

import useCategoryRequestHook from './useCategoryRequestHook';

export default () => {
  const taskList = useSelector(taskListCompletedSelector);
  const isTasksResolved = useSelector(isTasksResolvedSelector);
  const isCategoriesResolved = useCategoryRequestHook();

  return {
    taskList,
    isTasksResolved,
    isCategoriesResolved,
  };
};
