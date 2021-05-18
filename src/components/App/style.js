import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    margin: 'auto',
  },

  main: {
    flexGrow: 1,
  },

  offset: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
  },

  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
  },

  appBar: {
    [theme.breakpoints.up('md')]: {
      left: drawerWidth,
    },
  },

  appBarHeading: {
    letterSpacing: 3,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },

  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
