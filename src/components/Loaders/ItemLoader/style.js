import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'absolute',
    left: '0',
    right: '0',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },

  hidden: {
    visibility: 'hidden',
  },
}));

export default useStyles;
