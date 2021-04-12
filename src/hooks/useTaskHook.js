import { useDispatch, useSelector } from 'react-redux';
import {
  updateTask as updateTaskAction,
  removeTask as removeTaskAction,
} from '../store/tasks/actions';
import { isDeletePendingSelector } from '../store/tasks/selectors';

export default (id) => {
  const dispatch = useDispatch();
  const isDeletePending = useSelector(isDeletePendingSelector(id));

  const updateTask = (id, data) => dispatch(updateTaskAction(id, data));
  const removeTask = (id) => dispatch(removeTaskAction(id));

  return {
    isDeletePending,
    updateTask,
    removeTask,
  };
};
