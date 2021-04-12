import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import StarIcon from './StarIcon';
import useStyles from './style';
import useTaskHook from '../../hooks/useTaskHook';

const Task = ({ id, text, isChecked, isFavorite }) => {
  const classes = useStyles();

  const { isDeletePending, updateTask, removeTask } = useTaskHook(id);

  const [textValue, setTextValue] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckChange = (e) => {
    updateTask(id, { isChecked: e.currentTarget.checked });
  };

  const handleTextChange = (e) => {
    setTextValue(e.currentTarget.value);
  };

  const handleDelete = () => {
    removeTask(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, { text: textValue });
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleMarkFavorite = () => {
    updateTask(id, { isFavorite: !isFavorite });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <IconButton
            className={classes.favorite}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleMarkFavorite}
          >
            <StarIcon isHovered={isHovered} isFavorite={isFavorite} />
          </IconButton>
        </Grid>
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
            <IconButton color="secondary" onClick={handleDelete}>
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
  isFavorite: PropTypes.bool.isRequired,
};

export default Task;
