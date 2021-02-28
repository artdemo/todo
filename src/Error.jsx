import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const Error = ({ errorState, setError }) => {
  const styles = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    zIndex: 1000,
    visibility: errorState.isError ? 'visible' : 'hidden',
  };

  const handleEsc = (e) => {
    if (e.keyCode === 27) {
      setError({ ...errorState, isError: false });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleClick = (e) => {
    if (
      e.target.closest('#error-paper') &&
      !e.target.closest('#error-button')
    ) {
      return;
    }

    setError({ ...errorState, isError: false });
  };

  return ReactDOM.createPortal(
    <Grid
      container
      alignItems="center"
      justify="center"
      style={styles}
      onClick={handleClick}
    >
      <Grid item style={{ width: '50%' }}>
        <Paper
          id="error-paper"
          square
          style={{ padding: '50px', position: 'relative' }}
        >
          <IconButton
            id="error-button"
            color="secondary"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <ClearIcon />
          </IconButton>
          <Typography variant="h6" align="center">
            {errorState.errorMsg}
          </Typography>
        </Paper>
      </Grid>
    </Grid>,
    document.body,
  );
};

export default Error;
