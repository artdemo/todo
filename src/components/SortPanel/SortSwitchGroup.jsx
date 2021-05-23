import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

export const SortSwitchGroup = ({ list, checkedList, handleChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Sort</FormLabel>
    <FormGroup>
      {list.map((name) => (
        <FormControlLabel
          control={
            <Switch
              checked={checkedList[name]}
              onChange={handleChange}
              name={name}
            />
          }
          label={name[0].toUpperCase() + name.slice(1)}
          key={name}
        />
      ))}
    </FormGroup>
  </FormControl>
);

SortSwitchGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  checkedList: PropTypes.objectOf(PropTypes.bool),
  handleChange: PropTypes.func.isRequired,
};

SortSwitchGroup.defaultProps = {
  list: [],
  checkedList: [],
};
