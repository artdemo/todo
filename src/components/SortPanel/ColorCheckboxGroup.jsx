import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormGroup,
  Badge,
  Checkbox,
} from '@material-ui/core';
import { Icon } from '../Icon';
import { useStyles } from './ColorCheckboxGroup.styles';

export const ColorCheckboxGroup = ({ list, checkedList, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter by category</FormLabel>
      <FormGroup className={classes.colorGroup}>
        {list.map(([color, taskAmount]) => (
          <React.Fragment key={color}>
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
                checkedIcon={
                  <Icon iconName="rectangleChecked" iconColor={color} />
                }
                checked={checkedList.includes(color)}
                onChange={() => handleChange(color)}
              />
            </Badge>
          </React.Fragment>
        ))}
      </FormGroup>
    </FormControl>
  );
};

ColorCheckboxGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.array),
  checkedList: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

ColorCheckboxGroup.defaultProps = {
  list: [],
  checkedList: [],
};
