import React from 'react';
import PropTypes from 'prop-types';
import { Task } from './Task';

export const TaskList = ({ taskList }) =>
  taskList.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      name={task.name}
      isCompleted={task.isCompleted}
      isFavorite={task.isFavorite}
      categoryId={task.categoryId}
      color={task.color}
      date={task.date}
    />
  ));

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object),
};

TaskList.defaultProps = {
  taskList: [],
};
