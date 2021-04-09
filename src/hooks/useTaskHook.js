import { useDispatch, useSelector } from 'react-redux';
import {
  updateTask as updateTaskAction,
  removeTask as removeTaskAction,
} from '../store/tasks/actions';
import { isDeletePendingSelector } from '../store/tasks/selectors';

export default (id) => {
  const dispatch = useDispatch();
  const isDeletePending = useSelector(isDeletePendingSelector(id));

  const updateTask = (task) => dispatch(updateTaskAction(task));
  const removeTask = (id) => dispatch(removeTaskAction(id));

  return {
    isDeletePending,
    updateTask,
    removeTask,
  };
};
