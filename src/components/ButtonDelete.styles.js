import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));
