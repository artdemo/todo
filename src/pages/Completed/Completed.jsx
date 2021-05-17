import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Task from '../../components/Task';
import FrameBox from '../../components/FrameBox';
import MainLoader from '../../components/Loaders/MainLoader';
import SimpleLoader from '../../components/Loaders/SimpleLoader';
import useTaskRequestHook from '../../hooks/useTaskRequestHook';
import useCategoryRequestHook from '../../hooks/useCategoryRequestHook';

const Completed = () => {
  const {
    taskList,
    isTasksResolved,
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
  if (isTasksResolved === null || isCategoriesResolved === null)
    return <MainLoader />;

  // ===================== COMPLETED PAGE ===================== //
  return (
    <FrameBox>
      <InfiniteScroll
        dataLength={taskList.length}
        hasMore={Boolean(totalCount > taskList.length)}
        next={addPage}
        style={{ overflow: 'visible' }}
        loader={<SimpleLoader />}
      >
        {tasksToRender}
      </InfiniteScroll>
    </FrameBox>
  );
};

export default Completed;
