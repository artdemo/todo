import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import useFormHook from '../../hooks/useFormHook';

const Form = () => {
  const classes = useStyles();

  const { createTask, isCreatePending, isCreateFailed } = useFormHook();

  const [value, setValue] = useState('');

  useEffect(() => {
    // If a request ended up with error leave the form filled
    if (isCreateFailed === null || isCreateFailed === true) return;
    // Reset the form after submitting new task
    setValue('');
  }, [isCreateFailed]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === '' || isCreatePending) return;

    createTask({
      text: value.trim(),
      isChecked: false,
      isFavorite: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            margin="none"
            size="small"
            fullWidth
            label="Task"
            autoFocus
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          {isCreatePending ? (
            <CircularProgress color="secondary" className={classes.progress} />
          ) : (
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              className={classes.button}
              color="inherit"
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
