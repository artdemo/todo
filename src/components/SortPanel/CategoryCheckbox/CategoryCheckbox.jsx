import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Badge, Checkbox } from '@material-ui/core';
import Icon from '../../Icon';
import useStyles from './style';

const CategoryCheckbox = ({
  id,
  name,
  icon,
  taskAmount,
  isChecked,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.formControlLabelWrapper} key={name}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={() => handleChange(id)}
            name={name}
          />
        }
        label={name}
      />
      <Badge badgeContent={taskAmount} showZero>
        <Icon iconName={icon} fontSize="small" />
      </Badge>
    </div>
  );
};

CategoryCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  taskAmount: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CategoryCheckbox;
