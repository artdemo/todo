import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const DeleteButton = ({ isDeletePending, handleDelete }) => {
  if (isDeletePending) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <IconButton color="secondary" onClick={handleDelete}>
      <ClearIcon />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  isDeletePending: PropTypes.bool.isRequired,
};

export default DeleteButton;
