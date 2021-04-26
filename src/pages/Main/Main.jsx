import React, { useState, useEffect, useMemo } from 'react';
import { Grid, List } from '@material-ui/core';
import FrameBox from '../../components/FrameBox';
import Form from '../../components/Form';
import TextControl from '../../components/TextControl';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CategorySelect from '../../components/Selects/CategorySelect';
import Task from '../../components/Task';
import ItemBox from '../../components/ItemBox';
import MainLoader from '../../components/Loaders/MainLoader';
import useMainHook from '../../hooks/useMainHook';

const Main = () => {
  const {
    createTask,
    isCreatePending,
    isCreateFailed,
    categoryListFlat,
    taskList,
    isTasksResolved,
    isCategoriesResolved,
  } = useMainHook();

  const [textControlValue, setTextControlValue] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    // If a request ended up with error leave the form filled
    if (isCreateFailed === null || isCreateFailed === true) return;
    // Reset the form after submitting new task
    setTextControlValue('');
  }, [isCreateFailed]);

  const tasksToRender = useMemo(
    () =>
      taskList.map(
        ({ id, text, isCompleted, isFavorite, categoryId, color }) => (
          <ItemBox key={id}>
            <Task
              id={id}
              text={text}
              isCompleted={isCompleted}
              isFavorite={isFavorite}
              categoryId={categoryId}
              color={color}
            />
          </ItemBox>
        ),
      ),
    [taskList],
  );

  const categorySelect = useMemo(
    () => (
      <CategorySelect
        categoryList={categoryListFlat}
        index={selectedCategoryIndex}
        handleChange={(e) => setSelectedCategoryIndex(e.target.value)}
      />
    ),
    [categoryListFlat, selectedCategoryIndex],
  );

  if (!isTasksResolved || !isCategoriesResolved) return <MainLoader />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (textControlValue.trim() === '' || isCreatePending) return;

    const { id: categoryId, color } = categoryListFlat[selectedCategoryIndex];

    createTask({
      text: textControlValue.trim(),
      isCompleted: false,
      isFavorite: false,
      categoryId,
      color,
    });
  };

  return (
    <FrameBox>
      <Form handleSubmit={handleSubmit}>
        <Grid item xs={7}>
          <TextControl
            label="Task"
            value={textControlValue}
            handleChange={(e) => setTextControlValue(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={2}>
          {categorySelect}
        </Grid>
        <Grid item xs={3}>
          <SubmitButton isLoading={isCreatePending} />
        </Grid>
      </Form>
      <List>{tasksToRender}</List>
    </FrameBox>
  );
};

export default Main;
