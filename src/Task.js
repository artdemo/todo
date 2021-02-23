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
  const [taskText, setValue] = useState(text);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const handleCheckChange = (e) => {
    setLoading(true);

    updateData(id, { text: taskText, isChecked: e.currentTarget.checked }).then(
      () => {
        setLoading(false);
      },
    );
  };

  const handleTextChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleClick = () => {
    setLoading(true);

    deleteData(id).then(() => {
      setLoading(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    updateData(id, { text: taskText, isChecked }).then((response) => {
      if (response.isAxiosError) {
        setValue(text);
      }

      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={2}>
        {isLoading ? (
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <>
            <Grid item>
              <Checkbox onChange={handleCheckChange} checked={isChecked} />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                onChange={handleTextChange}
                value={taskText}
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
          </>
        )}
      </Grid>
    </form>
  );
};

export default Task;
