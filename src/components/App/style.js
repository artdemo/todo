import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    margin: 'auto',
  },

  main: {
    flexGrow: 1,
  },

  drawer: {
    width: 250,
  },

  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
  },
});

export default useStyles;
