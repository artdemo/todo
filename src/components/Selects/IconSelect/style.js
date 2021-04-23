import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  select: {
    '& > div > svg': {
      fontSize: 15,
    },
  },
});

export default useStyles;
