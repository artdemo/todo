import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  field: {
    '&::before': {
      borderBottomColor: 'transparent',
    },
  },
});

const Task = ({ id, text, isChecked, updateData, deleteData }) => {
  const [taskData, setTaskData] = useState({ text, isChecked });
  const classes = useStyles();

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
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Checkbox onChange={handleCheckChange} checked={taskData.isChecked} />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            onChange={handleTextChange}
            value={taskData.text}
            fullWidth
            InputProps={{
              className: classes.field,
            }}
          />
        </Grid>
        <Grid item>
          <IconButton color="secondary" onClick={handleClick}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Task;
