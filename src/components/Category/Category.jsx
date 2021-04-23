import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import useCategoryHook from '../../hooks/useCategoryHook';
import useStyles from './style';
import Icon from '../Icon';
import ItemLoader from '../Loaders/ItemLoader';
import DeleteButton from '../Buttons/DeleteButton';

const Category = ({ id, name, icon, colors, isDefault }) => {
  const classes = useStyles();

  console.log('Category');

  const {
    isDeletePending,
    removeCategory,
    markCategoryDefault,
  } = useCategoryHook(id);

  const handleMarkDefault = () => {
    markCategoryDefault(id);
  };

  return (
    <>
      <ItemLoader isVisible={isDeletePending} />
      <ListItemIcon className={`${isDeletePending && classes.hidden}`}>
        <IconButton onClick={handleMarkDefault} disabled={isDefault}>
          <Icon iconName={icon} />
        </IconButton>
      </ListItemIcon>
      <ListItemText
        className={`${isDeletePending && classes.hidden}`}
        primary={
          <Box className={classes.titleWrapper}>
            <Typography variant="h6" className={classes.titleHeader}>
              {name}
            </Typography>
            {colors.map((color) => (
              <Paper
                component="span"
                className={classes.colorTabSelected}
                key={color}
                style={{ backgroundColor: `${color}` }}
              />
            ))}
          </Box>
        }
        secondary={
          isDefault && (
            <Typography variant="caption">Default category</Typography>
          )
        }
      />
      <ListItemSecondaryAction
        className={`${classes.deleteButton} ${
          isDeletePending && classes.hidden
        }`}
      >
        <DeleteButton
          handleDelete={() => removeCategory(id)}
          disabled={isDefault}
        />
      </ListItemSecondaryAction>
    </>
  );
};

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDefault: PropTypes.bool.isRequired,
};

export default Category;
