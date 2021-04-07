import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { updateTask, removeTask } from '../../store/tasks/actions';

const Task = ({ id, text, isChecked, updateTask, removeTask, isPending }) => {
  const classes = useStyles();

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
          {isPending ? (
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

const mapStateToProps = ({ taskReducer }, { id }) => {
  const isPending = taskReducer.requestStatus.pendingTasks.includes(id);

  return {
    isPending,
  };
};

export default connect(mapStateToProps, { updateTask, removeTask })(Task);
