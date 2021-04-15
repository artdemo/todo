import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './style';

const Settings = () => {
  const classes = useStyles();

  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const handleIconChange = (e) => {
    setIcon(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="none"
                  size="small"
                  fullWidth
                  label="Category"
                  autoFocus
                  value={category}
                  onChange={handleCategoryChange}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="icon-label">Icon</InputLabel>
                  <Select
                    value={icon}
                    labelId="icon-label"
                    label="Icon"
                    onChange={handleIconChange}
                  >
                    <MenuItem value={1}>Place</MenuItem>
                    <MenuItem value={2}>Placehol</MenuItem>
                    <MenuItem value={3}>Placeholder</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="color-label">Color</InputLabel>
                  <Select
                    value={color}
                    labelId="color-label"
                    label="Color"
                    onChange={handleColorChange}
                  >
                    <MenuItem value={1}>Place</MenuItem>
                    <MenuItem value={2}>Placehol</MenuItem>
                    <MenuItem value={3}>Placeholder</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  className={classes.button}
                  color="inherit"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
