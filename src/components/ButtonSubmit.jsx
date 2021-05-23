import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './ButtonSubmit.styles';

export const ButtonSubmit = ({
  isLoading = false,
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

ButtonSubmit.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
};

ButtonSubmit.defaultProps = {
  disabled: false,
  type: 'submit',
  isLoading: false,
};
