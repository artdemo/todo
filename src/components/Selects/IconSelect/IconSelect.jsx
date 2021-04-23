import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Icon from '../../Icon';
import useStyles from './style';

const IconSelect = ({ icons, iconIndex, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="icon-label">Icon</InputLabel>
      <Select
        value={iconIndex}
        className={classes.select}
        labelId="icon-label"
        label="Icon"
        onChange={handleChange}
        disabled={!icons.length}
      >
        {icons.map((name, index) => (
          <MenuItem value={index} key={name}>
            <Icon iconName={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

IconSelect.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default IconSelect;
