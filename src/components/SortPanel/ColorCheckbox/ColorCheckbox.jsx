import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Checkbox } from '@material-ui/core';
import Icon from '../../Icon';
import useStyles from './style';

const ColorCheckbox = ({ color, taskAmount, isChecked, handleChange }) => {
  const classes = useStyles();

  return (
    <Badge
      classes={{
        root: classes.colorBadge,
        anchorOriginTopRightRectangle: classes.colorBadgeSparse,
      }}
      badgeContent={taskAmount}
      showZero
    >
      <Checkbox
        icon={<Icon iconName="rectangle" iconColor={color} />}
        checkedIcon={<Icon iconName="rectangleChecked" iconColor={color} />}
        checked={isChecked}
        onChange={() => handleChange(color)}
      />
    </Badge>
  );
};

ColorCheckbox.propTypes = {
  taskAmount: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColorCheckbox;
