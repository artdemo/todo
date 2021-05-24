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
import { useStyles } from './Category.styles';
import { Icon } from './Icon';
import { LoaderItem } from './LoaderItem';
import { ButtonDelete } from './ButtonDelete';
import { useCategoryHook } from '../hooks/useCategoryHook';

export const Category = ({ id, name, icon, colors }) => {
  const classes = useStyles();

  const {
    isDefault,
    isDeletePending,
    isSetDefaultPending,
    removeCategory,
    setDefaultCategoryId,
  } = useCategoryHook(id);

  return (
    <>
      <LoaderItem isVisible={isDeletePending || isSetDefaultPending} />
      <ListItemIcon
        className={`${
          (isDeletePending || isSetDefaultPending) && classes.hidden
        }`}
      >
        <IconButton
          onClick={() => {
            setDefaultCategoryId(id);
          }}
          disabled={isDefault}
          className={classes.button}
        >
          <Icon iconName={icon} />
        </IconButton>
      </ListItemIcon>
      <ListItemText
        className={`${
          (isDeletePending || isSetDefaultPending) && classes.hidden
        }`}
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
        className={`${classes.ButtonDelete} ${
          (isDeletePending || isSetDefaultPending) && classes.hidden
        }`}
      >
        <ButtonDelete
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
};
