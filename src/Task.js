import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const Task = ({ id, text, isChecked, updateData, deleteData }) => {
  const [taskData, setTaskData] = useState({ text, isChecked });

  const handleCheckChange = (e) => {
    setTaskData({ ...taskData, isChecked: e.currentTarget.checked });

    updateData(id, { ...taskData, isChecked: e.currentTarget.checked });
  };

  const handleTextChange = (e) => {
    setTaskData({ ...taskData, text: e.currentTarget.value });
  };

  const handleClick = () => {
    deleteData(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateData(id, taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox onChange={handleCheckChange} checked={taskData.isChecked} />
      <TextField onChange={handleTextChange} value={taskData.text} />
      <IconButton onClick={handleClick}>
        <ClearIcon />
      </IconButton>
    </form>
  );
};

export default Task;
