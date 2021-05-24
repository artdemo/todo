import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, TextField } from '@material-ui/core';
import { FrameBox } from '../components/FrameBox';
import { ButtonSubmit } from '../components/ButtonSubmit';
import { SelectCategory } from '../components/SelectCategory';
import { Task } from '../components/Task';
import { LoaderMain } from '../components/LoaderMain';
import { LoaderPage } from '../components/LoaderPage';
import { useMainHook } from '../hooks/useMainHook';
import { useTaskRequestHook } from '../hooks/useTaskRequestHook';
import { useCategoryRequestHook } from '../hooks/useCategoryRequestHook';

export const Main = () => {
  const [textControlValue, setTextControlValue] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const {
    createTask,
    isCreatePending,
    isCreateFailed,
    categoryListFlatted,
  } = useMainHook();

  const isCategoriesResolved = useCategoryRequestHook();

  const {
    taskList,
    isTasksResolved,
    totalCount,
    addPage,
  } = useTaskRequestHook({ isCompleted: false });

  useEffect(() => {
    // If a request end up with error leave the form filled
    if (isCreateFailed === null || isCreateFailed === true) return;
    // Reset the form after submitting new task
    setTextControlValue('');
  }, [isCreateFailed]);

  // ======================= CATEGORY_SELECT ===================== //
  const selectCategory = useMemo(
    () => (
      <SelectCategory
        categoryList={categoryListFlatted}
        index={selectedCategoryIndex}
        handleChange={(e) => setSelectedCategoryIndex(e.target.value)}
      />
    ),
    [categoryListFlatted, selectedCategoryIndex],
  );

  // ========================== TASK_LIST ========================== //
  const tasksToRender = useMemo(
    () =>
      taskList.map(
        ({ id, name, isCompleted, isFavorite, categoryId, color, date }) => (
          <Task
            key={id}
            id={id}
            name={name}
            isCompleted={isCompleted}
            isFavorite={isFavorite}
            categoryId={categoryId}
            color={color}
            date={date}
          />
        ),
      ),
    [taskList],
  );

  // ======================== LOADER ========================== //
  if (isTasksResolved === null || isCategoriesResolved === null)
    return <LoaderMain />;

  // ======================= MAIN PAGE ======================== //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (textControlValue.trim() === '' || isCreatePending) return;

    const { id: categoryId, color } = categoryListFlatted[
      selectedCategoryIndex
    ];

    createTask({
      name: textControlValue.trim(),
      isCompleted: false,
      isFavorite: false,
      categoryId,
      color,
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <FrameBox>
      <form onSubmit={handleSubmit}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item sm={7} xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              size="small"
              fullWidth
              autoFocus
              label="Task"
              value={textControlValue}
              onChange={(e) => setTextControlValue(e.currentTarget.value)}
            />
          </Grid>
          <Grid item sm={2} xs={6}>
            {selectCategory}
          </Grid>
          <Grid item sm={3} xs={6}>
            <ButtonSubmit isLoading={isCreatePending}>Add</ButtonSubmit>
          </Grid>
        </Grid>
      </form>
      <InfiniteScroll
        dataLength={taskList.length}
        hasMore={Boolean(totalCount > taskList.length)}
        next={addPage}
        style={{ overflow: 'visible' }}
        loader={<LoaderPage />}
      >
        {tasksToRender}
      </InfiniteScroll>
    </FrameBox>
  );
};