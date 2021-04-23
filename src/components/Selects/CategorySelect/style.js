import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  select: {
    '& > div > svg': {
      fontSize: 15,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
