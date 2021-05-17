import { createSelector } from 'reselect';
import set from '../../utils/set.json';

export const categoryListSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  ({ defaultCategoryIdReducer }) => defaultCategoryIdReducer.defaultCategoryId,
  (categoryList, defaultCategoryId) =>
    [...categoryList].sort(({ id }) => {
      if (id === defaultCategoryId) return -1;
      return 1;
    }),
);

export const isResolvedSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isResolved;

export const isCreatePendingSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isCreatePending;

export const isCreateFailedSelector = ({ categoryReducer }) =>
  categoryReducer.requestStatus.isCreateFailed;

export const isDeletePendingSelector = (id) => ({ categoryReducer }) =>
  categoryReducer.requestStatus.pendingCategories.includes(id);

// Get free icons and all colors
export const iconListSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  (categoryList) => {
    // Get all icons and colors from json
    const { icons: setIcons, colors } = set;
    // Get all occupied icons from created categories
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

// Get separate entity for each icon-color relation
export const categoryListFlattedSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  (categoryList) => {
    const categoryListFlatted = [];

    categoryList.forEach(({ name, icon, colors, id }) => {
      colors.forEach((color) => {
        categoryListFlatted.push({ name, icon, color, id });
      });
    });

    return categoryListFlatted;
  },
);

// Get categories list with count of all corresponding tasks
export const categoryListTaskCountSelector = createSelector(
  ({ categoryReducer }) => categoryReducer.categoryList,
  ({ taskReducer }) => taskReducer.taskList,
  (categoryList, taskList) =>
    categoryList.map(({ id, name, icon }) => {
      const tasks = taskList.filter(({ categoryId }) => categoryId === id);

      return { id: id.toString(), name, icon, taskAmount: tasks.length };
    }),
);
