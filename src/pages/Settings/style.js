import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    marginBottom: 12,
  },

  formControl: {
    width: '100%',
  },

  progress: {
    display: 'block',
    margin: 'auto',
  },

  button: {
    color: 'green',
    height: '100%',
  },

  paper: {
    padding: 10,
  },

  gutters: {
    padding: 0,
  },

  colorTab: {
    width: 24,
    height: 24,
  },

  colorTabSelected: {
    width: 12,
    height: 12,
    verticalAlign: 'baseline',
    display: 'inline-block',
    '& + &': {
      marginLeft: 3,
    },
  },

  iconTabSelected: {
    fontSize: 15,
  },
});

export default useStyles;
