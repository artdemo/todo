import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '../../Icon';

const DeleteButton = ({ handleDelete, disabled = false }) => (
  <IconButton color="secondary" onClick={handleDelete} disabled={disabled}>
    <Icon iconName="clear" />
  </IconButton>
);

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

DeleteButton.defaultProps = {
  disabled: false,
};

export default DeleteButton;
