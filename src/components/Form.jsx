import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    marginBotton: '12px',
  },
  progress: {
    display: 'block',
    margin: 'auto',
  },
  button: {
    color: 'green',
    height: '100%',
  },
});

const Form = ({ createData }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === '' || isLoading) return;

    setLoading(true);

    createData({
      text: value.trim(),
      isChecked: false,
    }).then((response) => {
      setLoading(false);

      if (response === undefined || !response.isAxiosError) {
        setValue('');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            margin="none"
            size="small"
            fullWidth
            label="Task"
            autoFocus
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          {isLoading ? (
            <CircularProgress color="secondary" className={classes.progress} />
          ) : (
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              className={classes.button}
              color="inherit"
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
