import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '../../Icon';
import useStyles from './style';

const DeleteButton = ({ handleDelete, disabled = false }) => {
  const classes = useStyles();

  return (
    <IconButton
      color="secondary"
      onClick={handleDelete}
      disabled={disabled}
      className={classes.button}
    >
      <Icon iconName="clear" />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

DeleteButton.defaultProps = {
  disabled: false,
};

export default DeleteButton;
