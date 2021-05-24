import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Fade } from '@material-ui/core';
import { Icon } from './Icon';

import { useStyles } from './ButtonFavorite.styles';

export const ButtonFavorite = ({ handleMarkFavorite, isFavorite }) => {
  const classes = useStyles();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <IconButton
      onClick={handleMarkFavorite}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classes.button}
    >
      <Fade in={isFavorite}>
        <Icon iconName="star" iconColor="gold" />
      </Fade>
      <Fade in={isHovered}>
        <Icon iconName="star-half" classProp={classes.icon} iconColor="gold" />
      </Fade>
      <Fade in={!isHovered && !isFavorite}>
        <Icon
          iconName="star-outlined"
          classProp={classes.icon}
          iconColor="gold"
        />
      </Fade>
    </IconButton>
  );
};

ButtonFavorite.propTypes = {
  handleMarkFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
