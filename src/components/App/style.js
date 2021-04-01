import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  paper: {
    padding: 10,
  },
});

export default useStyles;
