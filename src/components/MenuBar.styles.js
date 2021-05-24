import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../utils/constants';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      left: DRAWER_WIDTH,
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
