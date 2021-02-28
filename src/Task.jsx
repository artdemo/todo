import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  field: {
    '&::before': {
      borderBottomColor: 'transparent',
    },
  },
});

const Task = ({ id, text, isChecked, updateData, deleteData }) => {
  const [taskData, setData] = useState({ text, isChecked });
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const handleCheckChange = (e) => {
    setData({ ...taskData, isChecked: e.currentTarget.checked });

    updateData(id, { ...taskData, isChecked: e.currentTarget.checked }).then(
      (error) => {
        if (error && error.isAxiosError) {
          setData({ text, isChecked });
        }
      },
    );
  };

  const handleTextChange = (e) => {
    setData({ ...taskData, text: e.currentTarget.value });
  };

  const handleClick = () => {
    setLoading(true);

    deleteData(id).then((error) => {
      if (error && error.isAxiosError) {
        setData({ text, isChecked });
      }

      setLoading(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateData(id, taskData).then((error) => {
      if (error && error.isAxiosError) {
        setData({ text, isChecked });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Checkbox
            onChange={handleCheckChange}
            checked={taskData.isChecked}
            style={{ padding: '12px' }}
          />
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
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <IconButton color="secondary" onClick={handleClick}>
              <ClearIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Task;
