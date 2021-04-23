import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from '@material-ui/core';
import useStyles from './style';

const ColorSelect = ({ icons, colors, selectedColors, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="color-label">Color</InputLabel>
      <Select
        value={selectedColors}
        labelId="color-label"
        multiple
        label="Color"
        onChange={handleChange}
        disabled={!icons.length}
        renderValue={(selected) =>
          icons.length
            ? selected.map((color) => (
                <Paper
                  className={classes.colorTabSelected}
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                />
              ))
            : ''
        }
      >
        {colors.map((color) => (
          <MenuItem value={color} key={color}>
            <Paper
              className={classes.colorTab}
              style={{ backgroundColor: `${color}` }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ColorSelect.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ColorSelect;
