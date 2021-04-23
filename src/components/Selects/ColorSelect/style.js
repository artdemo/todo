import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  colorTab: {
    width: 24,
    height: 24,
  },
  colorTabSelected: {
    fontSize: 15,
    width: 12,
    height: 12,
    verticalAlign: 'baseline',
    display: 'inline-block',
    '& + &': {
      marginLeft: 3,
    },
  },
});

export default useStyles;
