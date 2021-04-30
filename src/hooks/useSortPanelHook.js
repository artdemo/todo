import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getTasks as getTasksAction } from '../store/tasks/actions';
import { turnQueryToObject, turnObjectToQuery } from '../utils/helpers';

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const isSortPending = useSelector(
    ({ taskReducer }) => taskReducer.requestStatus.isSortPending,
  );
  const resolvedSortState = useSelector(
    ({ taskReducer }) => taskReducer.resolvedSortState,
  );
  const getTasks = (nextSortObj) => dispatch(getTasksAction(nextSortObj));

  // Take sort object from url
  useEffect(() => {
    const { search } = location;
    const locationSearch = new URLSearchParams(search);
    const query = locationSearch.getAll('_sort');

    const sortObj = turnQueryToObject(query, { date: false, name: false });

    getTasks(sortObj);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Insert sort object into url
  useEffect(() => {
    const query = turnObjectToQuery(resolvedSortState, '_sort');

    history.replace({ search: query });
  }, [resolvedSortState, history, location.pathname]);

  return {
    isSortPending,
    resolvedSortState,
    getTasks,
  };
};
