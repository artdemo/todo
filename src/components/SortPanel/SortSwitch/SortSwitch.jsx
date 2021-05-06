import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';

const SortSwitch = ({ handleChange, name, isChecked }) => (
  <FormControlLabel
    control={<Switch checked={isChecked} onChange={handleChange} name={name} />}
    label="Name"
  />
);

SortSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SortSwitch;
