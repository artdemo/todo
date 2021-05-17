import { useDispatch, useSelector } from 'react-redux';
import {
  updateTask as updateTaskAction,
  removeTask as removeTaskAction,
} from '../store/tasks/actions';
import {
  isModifyPendingSelector,
  iconSelector,
} from '../store/tasks/selectors';

export default (taskId, categoryId) => {
  const dispatch = useDispatch();
  const isPending = useSelector(isModifyPendingSelector(taskId));
  const icon = useSelector(iconSelector(categoryId));

  const updateTask = (taskId, data) => dispatch(updateTaskAction(taskId, data));
  const removeTask = (taskId) => dispatch(removeTaskAction(taskId));

  return {
    isPending,
    updateTask,
    removeTask,
    icon,
  };
};
