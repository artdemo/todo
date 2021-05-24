import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    margin: 'auto',
  },

  main: {
    flexGrow: 1,
  },

  offset: theme.mixins.toolbar,
}));
