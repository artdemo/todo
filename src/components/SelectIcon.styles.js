import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  select: {
    '& > div > svg': {
      fontSize: 15,
    },
  },
});
