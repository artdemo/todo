import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TextControl = ({ handleChange, value, label, disabled = false }) => (
  <TextField
    variant="outlined"
    margin="none"
    size="small"
    fullWidth
    label={label}
    autoFocus
    value={value}
    disabled={disabled}
    onChange={handleChange}
  />
);

TextControl.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

TextControl.defaultProps = {
  label: '',
  value: '',
  disabled: false,
};

export default TextControl;
