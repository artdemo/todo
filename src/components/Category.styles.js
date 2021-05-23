import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorTabSelected: {
    width: 12,
    height: 12,
    verticalAlign: 'baseline',
    display: 'inline-block',
    '& + &': {
      marginLeft: theme.spacing(0.5),
    },
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'baseline',
  },

  titleHeader: {
    marginRight: theme.spacing(1),
  },

  ButtonDelete: {
    right: 0,
  },

  hidden: {
    visibility: 'hidden',
  },

  button: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));
