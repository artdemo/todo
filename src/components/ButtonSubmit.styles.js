import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  progress: {
    display: 'block',
    margin: 'auto',
  },
  button: {
    height: 40,
  },

  buttonIsSubmit: {
    color: 'green',
  },

  buttonIsReset: {
    color: '#f50057',
  },
});
