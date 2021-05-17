import { createSelector } from 'reselect';

export const isDefaultCategorySelector = (id) =>
  createSelector(
    ({ defaultCategoryIdReducer }) =>
      defaultCategoryIdReducer.defaultCategoryId,
    (defaultCategoryId) => defaultCategoryId === id,
  );

export const defaultCategoryIdSelector = ({ defaultCategoryIdReducer }) =>
  defaultCategoryIdReducer.defaultCategoryId;

export const isSetDefaultPendingSelector = (id) => ({
  defaultCategoryIdReducer,
}) => id === defaultCategoryIdReducer.pendingCategory;

export const isResolvedSelector = ({ defaultCategoryIdReducer }) =>
  defaultCategoryIdReducer.isResolved;
