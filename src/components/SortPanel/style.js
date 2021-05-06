import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1.5),
  },

  colorGroup: {
    flexDirection: 'row',
  },
}));

export default useStyles;
