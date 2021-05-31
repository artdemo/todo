import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FrameBox } from '../components/FrameBox';
import { LoaderMain } from '../components/LoaderMain';
import { LoaderPage } from '../components/LoaderPage';
import { TaskList } from '../components/TaskList';
import { useTaskRequestHook } from '../hooks/useTaskRequestHook';
import { useCategoryRequestHook } from '../hooks/useCategoryRequestHook';
import { TaskInput } from "../components/TaskInput";

export const Main = () => {
  const categoriesResolvedStatus = useCategoryRequestHook();

  const {
    taskList,
    tasksResolvedStatus,
    totalCount,
    addPage,
  } = useTaskRequestHook({ isCompleted: false });

  if (tasksResolvedStatus === null || categoriesResolvedStatus === null)
    return <LoaderMain />;

  return (
    <FrameBox>
      <TaskInput />
      <InfiniteScroll
        dataLength={taskList.length}
        hasMore={Boolean(totalCount > taskList.length)}
        next={addPage}
        style={{ overflow: 'visible' }}
        loader={<LoaderPage />}
      >
        <TaskList taskList={taskList} />
      </InfiniteScroll>
    </FrameBox>
  );
};