/*eslint-disable*/

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  main: {
    flexGrow: 1,
  },

  drawer: {
    width: drawerWidth,
  },

  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
  },

  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  bar: {
    marginBottom: 50,
  },
}));

export default useStyles;
