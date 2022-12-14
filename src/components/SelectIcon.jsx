import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Icon } from './Icon';
import { useStyles } from './SelectIcon.styles';

export const SelectIcon = ({ icons, iconIndex, handleChange }) => {
  const classes = useStyles();

  const menuItems = useMemo(
    () =>
      icons.map((name, index) => (
        <MenuItem value={index} key={name}>
          <Icon iconName={name} />
        </MenuItem>
      )),
    [icons],
  );

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
        {menuItems}
      </Select>
    </FormControl>
  );
};

SelectIcon.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleChange: PropTypes.func.isRequired,
};
