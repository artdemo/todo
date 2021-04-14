import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  bar: {
    marginBottom: 50,
  },
});

export default useStyles;
