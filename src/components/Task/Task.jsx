import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import useTaskHook from '../../hooks/useTaskHook';

const Task = ({ id, text, isChecked }) => {
  const classes = useStyles();

  const { isDeletePending, updateTask, removeTask } = useTaskHook(id);

  const [textValue, setTextValue] = useState(text);

  const handleCheckChange = (e) => {
    updateTask({ id, text: textValue, isChecked: e.currentTarget.checked });
  };

  const handleTextChange = (e) => {
    setTextValue(e.currentTarget.value);
  };

  const handleClick = () => {
    removeTask(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTask({ id, text: textValue, isChecked });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckChange}
            className={classes.checkbox}
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            value={textValue}
            fullWidth
            InputProps={{
              className: classes.field,
            }}
            onChange={handleTextChange}
          />
        </Grid>
        <Grid item>
          {isDeletePending ? (
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

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default Task;
