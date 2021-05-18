import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'absolute',
  },

  button: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

export default useStyles;
