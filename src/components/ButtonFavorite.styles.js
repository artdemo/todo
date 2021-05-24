import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'absolute',
  },

  button: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));
