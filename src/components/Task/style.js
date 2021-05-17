import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

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

  hidden: {
    visibility: 'hidden',
  },
});

export default useStyles;
