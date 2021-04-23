import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from './style';

const SubmitButton = ({ isLoading, disabled = false }) => {
  const classes = useStyles();

  if (isLoading)
    return <CircularProgress color="secondary" className={classes.progress} />;

  return (
    <Button
      type="submit"
      variant="outlined"
      fullWidth
      className={classes.button}
      color="inherit"
      disabled={disabled}
    >
      Add
    </Button>
  );
};

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
