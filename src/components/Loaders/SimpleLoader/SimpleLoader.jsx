import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const SimpleLoader = () => (
  <CircularProgress
    color="secondary"
    style={{ display: 'block', margin: 'auto' }}
  />
);

export default SimpleLoader;
