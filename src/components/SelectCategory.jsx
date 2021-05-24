import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import { Icon } from './Icon';
import { useStyles } from './SelectCategory.styles';

export const SelectCategory = ({ categoryList, index, handleChange }) => {
  const classes = useStyles();

  const menuItems = useMemo(
    () =>
      categoryList.map(({ name, icon, color }, index) => (
        <MenuItem key={`${name}-${color}`} value={index}>
          <Icon iconName={icon} iconColor={color} classProp={classes.icon} />
          <Typography variant="subtitle2">{name}</Typography>
        </MenuItem>
      )),
    [categoryList, classes.icon],
  );

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <Select
        value={index}
        onChange={handleChange}
        className={classes.select}
        renderValue={(index) => {
          if (!categoryList.length) return '';

          const { icon, color } = categoryList[index];

          return <Icon iconName={icon} iconColor={color} />;
        }}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

SelectCategory.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

SelectCategory.defaultProps = {
  categoryList: [],
};
