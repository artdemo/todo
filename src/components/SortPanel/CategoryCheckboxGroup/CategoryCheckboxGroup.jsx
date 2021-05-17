import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Badge,
  Checkbox,
} from '@material-ui/core';
import Icon from '../../Icon';
import useStyles from './style';

const CategoryCheckboxGroup = ({ list, checkedList, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter by category</FormLabel>
      <FormGroup>
        {list.map(({ id, name, icon, taskAmount }) => (
          <div className={classes.formControlLabelWrapper} key={name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedList.includes(id)}
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
        ))}
      </FormGroup>
    </FormControl>
  );
};

CategoryCheckboxGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  checkedList: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

CategoryCheckboxGroup.defaultProps = {
  list: [],
  checkedList: [],
};

export default CategoryCheckboxGroup;
