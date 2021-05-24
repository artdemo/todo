import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { format } from 'date-fns';

import {
  TextField,
  Checkbox,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ButtonFavorite } from './ButtonFavorite';
import { ButtonDelete } from './ButtonDelete';
import { LoaderItem } from './LoaderItem';
import { Icon } from './Icon';
import { useStyles } from './Task.styles';
import { useTaskHook } from '../hooks/useTaskHook';

export const Task = ({
  id,
  name,
  isCompleted,
  isFavorite,
  categoryId,
  color,
  date,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { icon, isPending, removeTask, updateTask } = useTaskHook(
    id,
    categoryId,
  );

  const [textValue, setTextValue] = useState(name);

  const handleTextChange = (e) => {
    // Edit task only on the Main page
    if (isCompleted) return;

    setTextValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit task only on the Main page
    if (isCompleted) return;

    updateTask(id, { name: textValue }).catch(() => {
      // Set initial textValue if request failed
      setTextValue(name);
    });
  };

  return (
    <div className={classes.wrapper}>
      <LoaderItem isVisible={isPending} />
      <form
        className={`${classes.form} ${isPending && classes.hidden}`}
        onSubmit={handleSubmit}
      >
        <Grid container alignItems="center" spacing={2} wrap="nowrap">
          <Grid item>
            <Checkbox
              size={isXs ? 'small' : 'medium'}
              checked={isCompleted}
              onChange={(e) =>
                updateTask(id, {
                  isCompleted: e.currentTarget.checked,
                  isFavorite: false,
                })
              }
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
          <Grid item>
            <Typography
              variant="caption"
              classes={{ caption: classes.caption }}
            >
              {isXs ? format(new Date(date), 'yy/MM/dd') : date}
            </Typography>
          </Grid>
          {!isCompleted && (
            <Grid item>
              <ButtonFavorite
                handleMarkFavorite={() =>
                  updateTask(id, { isFavorite: !isFavorite })
                }
                isFavorite={isFavorite}
              />
            </Grid>
          )}
          <Grid item>
            <ButtonDelete handleDelete={() => removeTask(id)} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  categoryId: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
