import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FavoriteButton from '../Buttons/FavoriteButton';
import DeleteButton from '../Buttons/DeleteButton';
import ItemLoader from '../Loaders/ItemLoader';
import useStyles from './style';
import useTaskHook from '../../hooks/useTaskHook';
import Icon from '../Icon';

const Task = ({ id, text, isCompleted, isFavorite, categoryId, color }) => {
  const classes = useStyles();

  console.log('Task');

  const { isModifyPending, updateTask, removeTask, icon } = useTaskHook(
    id,
    categoryId,
  );

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

    updateTask(id, { text: textValue }).catch(() => {
      // Set initial textValue if request failed
      setTextValue(text);
    });
  };

  return (
    <>
      <ItemLoader isVisible={isModifyPending} />
      <form
        className={`${classes.form} ${isModifyPending && classes.hidden}`}
        onSubmit={handleSubmit}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Checkbox
              checked={isCompleted}
              onChange={handleCheckChange}
              className={classes.checkbox}
            />
          </Grid>
          <Grid item>
            <Icon iconName={icon} iconColor={color} />
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
            <DeleteButton handleDelete={() => removeTask(id)} />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  categoryId: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Task;
