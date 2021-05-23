import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },

  field: {
    '&::before': {
      borderBottomColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },

  caption: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6rem',
    },
  },

  form: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginTop: 12,
    },
  },

  hidden: {
    visibility: 'hidden',
  },
}));
