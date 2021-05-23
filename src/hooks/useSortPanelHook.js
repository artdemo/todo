import { useDispatch, useSelector } from 'react-redux';
import { setParams as setParamsAction } from '../store/tasks/actions';
import {
  usedColorsSelector,
  sortObjSelector,
  filterColorArraySelector,
  filterCategoryArraySelector,
} from '../store/tasks/selectors';
import { categoryListTaskCountSelector } from '../store/categories/selectors';

export const useSortPanelHook = () => {
  const dispatch = useDispatch();

  const categoryListTaskCount = useSelector(categoryListTaskCountSelector);
  const usedColorsObj = useSelector(usedColorsSelector);
  const sortObj = useSelector(sortObjSelector);
  const filterColorArray = useSelector(filterColorArraySelector);
  const filterCategoryArray = useSelector(filterCategoryArraySelector);

  const setParams = (params) => dispatch(setParamsAction(params));

  return {
    filterCategoryArray,
    filterColorArray,
    sortObj,
    categoryListTaskCount,
    usedColorsObj,
    setParams,
  };
};
