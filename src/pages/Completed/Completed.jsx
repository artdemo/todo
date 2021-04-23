import React from 'react';
import List from '@material-ui/core/List';
import Task from '../../components/Task';
import FrameBox from '../../components/FrameBox';
import ItemBox from '../../components/ItemBox';
import MainLoader from '../../components/Loaders/MainLoader';
import useCompletedHook from '../../hooks/useCompletedHook';

const Completed = () => {
  const {
    isTasksResolved,
    isCategoriesResolved,
    taskList,
  } = useCompletedHook();

  if (!isTasksResolved || !isCategoriesResolved) return <MainLoader />;

  return (
    <FrameBox>
      <List>
        {taskList.map(
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
        )}
      </List>
    </FrameBox>
  );
};

export default Completed;
