import { useEffect } from 'react';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  taskListSelector,
  isResolvedSelector,
  queryParamsSelector,
  totalCountSelector,
} from '../store/tasks/selectors';
import {
  addPage as addPageAction,
  getTasks,
  setParams,
} from '../store/tasks/actions';
import { cancelRequest } from '../utils/api/methods';

export default ({ isCompleted }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const taskList = useSelector(taskListSelector);
  const queryParams = useSelector(queryParamsSelector);
  const isTasksResolved = useSelector(isResolvedSelector);
  const totalCount = useSelector(totalCountSelector);

  const addPage = () => dispatch(addPageAction);

  useEffect(() => {
    const params = { ...qs.parse(location.search), _start: 0, isCompleted };

    dispatch(setParams(params));
  }, []);

  useEffect(() => {
    const { _start, _limit, _order, isCompleted, ...rest } = queryParams;

    // const query = qs.stringify(queryParams, {
    const query = qs.stringify(rest, {
      skipEmptyString: true,
    });

    history.replace({ search: query });

    dispatch(getTasks());
    // Cancel redundant request
    return () => {
      cancelRequest();
    };
  }, [queryParams]);

  return {
    taskList,
    isTasksResolved,
    totalCount,
    addPage,
  };
};
