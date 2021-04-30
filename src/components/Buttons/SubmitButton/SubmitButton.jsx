import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from './style';

const SubmitButton = ({
  isLoading,
  disabled = false,
  type = 'submit',
  children,
}) => {
  const classes = useStyles();

  if (isLoading)
    return <CircularProgress color="secondary" className={classes.progress} />;

  return (
    <Button
      type={type}
      variant="outlined"
      fullWidth
      color="inherit"
      disabled={disabled}
      className={`${classes.button} ${
        type === 'submit' ? classes.buttonIsSubmit : classes.buttonIsReset
      }`}
    >
      {children}
    </Button>
  );
};

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  disabled: false,
  type: 'submit',
};

export default SubmitButton;
