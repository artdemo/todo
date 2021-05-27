import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Task } from '../components/Task';
import { FrameBox } from '../components/FrameBox';
import { LoaderMain } from '../components/LoaderMain';
import { LoaderPage } from '../components/LoaderPage';
import { useTaskRequestHook } from '../hooks/useTaskRequestHook';
import { useCategoryRequestHook } from '../hooks/useCategoryRequestHook';

export const Completed = () => {
  const {
    taskList,
    tasksResolvedStatus,
    totalCount,
    addPage,
  } = useTaskRequestHook({ isCompleted: true });

  const isCategoriesResolved = useCategoryRequestHook();

  // ======================= TASK_LIST ======================== //
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
  if (tasksResolvedStatus === null || isCategoriesResolved === null)
    return <LoaderMain />;

  // ===================== COMPLETED PAGE ===================== //
  return (
    <FrameBox>
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
