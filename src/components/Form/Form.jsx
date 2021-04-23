import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';

const Form = ({ children, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.PropTypes.element),
  handleSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  children: [],
};

export default Form;
