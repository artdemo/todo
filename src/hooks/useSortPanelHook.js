import qs from 'query-string';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getTasks as getTasksAction } from '../store/tasks/actions';

import {
  isSortPendingSelector,
  usedColorsSelector,
  queryParamsSelector,
  sortObjSelector,
  isResolvedSelector,
  filterColorArraySelector,
  filterCategoryArraySelector,
} from '../store/tasks/selectors';
import { categoryListAmountSelector } from '../store/categories/selectors';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { search } = location;

  const isSortPending = useSelector(isSortPendingSelector);
  const categoryListAmount = useSelector(categoryListAmountSelector);
  const usedColorsObj = useSelector(usedColorsSelector);
  const queryParams = useSelector(queryParamsSelector);
  const isResolved = useSelector(isResolvedSelector);
  const sortObj = useSelector(sortObjSelector);

  const filterColorArray = useSelector(filterColorArraySelector);
  const filterCategoryArray = useSelector(filterCategoryArraySelector);

  const getTasks = (params) => dispatch(getTasksAction(params));

  useEffect(() => {
    // If it's the first request, take sort object from url
    if (isResolved === null) {
      const params = qs.parse(search);
      getTasks(params);

      return;
    }

    const query = qs.stringify(queryParams, { skipEmptyString: true });

    history.replace({ search: query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, location.pathname]);

  return {
    isSortPending,
    filterCategoryArray,
    filterColorArray,
    sortObj,
    categoryListAmount,
    usedColorsObj,
    getTasks,
  };
};
