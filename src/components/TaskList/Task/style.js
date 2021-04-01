import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  item: {
    flexGrow: 1,
  },

  checkbox: {
    padding: 12,
  },

  field: {
    '&::before': {
      borderBottomColor: 'transparent',
    },
  },

  form: {
    flexGrow: 1,
  },
});

export default useStyles;
