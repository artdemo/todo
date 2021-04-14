/*eslint-disable*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FavoriteButton from './FavoriteButton';
import DeleteButton from './DeleteButton';
import useStyles from './style';
import useTaskHook from '../../hooks/useTaskHook';

const Task = ({ id, text, isCompleted, isFavorite }) => {
  const classes = useStyles();

  const { isDeletePending, updateTask, removeTask } = useTaskHook(id);

  const [textValue, setTextValue] = useState(text);

  const handleCheckChange = (e) => {
    const dataToUpdate = { isCompleted: e.currentTarget.checked };
    // Reset isFavorite prop after task has been marked as completed
    if (isFavorite) dataToUpdate.isFavorite = false;

    updateTask(id, dataToUpdate);
  };

  const handleTextChange = (e) => {
    // Edit task only on the Main page
    if (isCompleted) return;

    setTextValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit task only on the Main page
    if (isCompleted) return;

    updateTask(id, { text: textValue });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={2}>
        {!isCompleted && (
          <Grid item>
            <FavoriteButton
              handleMarkFavorite={() =>
                updateTask(id, { isFavorite: !isFavorite })
              }
              isFavorite={isFavorite}
            />
          </Grid>
        )}
        <Grid item>
          <Checkbox
            checked={isCompleted}
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
          <DeleteButton
            isDeletePending={isDeletePending}
            handleDelete={() => removeTask(id)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default Task;
