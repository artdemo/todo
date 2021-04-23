import { createSelector } from 'reselect';
import set from '../../utils/set.json';

export const categoryListSelector = ({ categoryReducer }) =>
  categoryReducer.categoryList;

export const iconListSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  (categoryList) => {
    // Get all icons and colors from json
    const { icons: setIcons, colors } = set;
    // Get all ocuppied icons from created categories
    const occupiedIcons = categoryList.map((category) => category.icon);
    // Return icons which are not occupied by the created categories
    const availableIcons = setIcons.filter(
      (setIcon) => !occupiedIcons.includes(setIcon),
    );

    return {
      availableIcons,
      colors,
    };
  },
);

export const categoryListFlatSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  (categoryList) => {
    const categoryListFlat = [];

    categoryList.forEach(({ name, icon, colors, id }) => {
      colors.forEach((color) => {
        categoryListFlat.push({ name, icon, color, id });
      });
    });

    return categoryListFlat;
  },
);

export const isResolvedSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isResolved;

export const isCreatePendingSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isCreatePending;

export const isCreateFailedSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isCreateFailed;

export const isDeletePendingSelector = (id) => ({ categoryReducer }) =>
  categoryReducer.requestStatus.pendingCategories.includes(id);
