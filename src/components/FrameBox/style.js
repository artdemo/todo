import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },

  paper: {
    padding: theme.spacing(1.5),
  },
}));

export default useStyles;
