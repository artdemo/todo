import { useSelector } from 'react-redux';
import { taskListCompletedSelector } from '../store/tasks/selectors';
import useCategoryRequestHook from './useCategoryRequestHook';
import useTaskRequestHook from './useTaskRequestHook';

export default () => {
  const taskList = useSelector(taskListCompletedSelector);
  const isTasksResolved = useTaskRequestHook();
  const isCategoriesResolved = useCategoryRequestHook();

  return {
    taskList,
    isTasksResolved,
    isCategoriesResolved,
  };
};
