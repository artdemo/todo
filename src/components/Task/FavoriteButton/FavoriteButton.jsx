import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import useStyles from './style';

const FavoriteButton = ({ handleMarkFavorite, isFavorite }) => {
  const classes = useStyles();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <IconButton
      onClick={handleMarkFavorite}
      className={classes.favorite}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SvgIcon>
        <Fade in={isFavorite}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </Fade>
        <Fade in={isHovered}>
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </Fade>
        <Fade in={!isHovered && !isFavorite}>
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </Fade>
      </SvgIcon>
    </IconButton>
  );
};

FavoriteButton.propTypes = {
  handleMarkFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteButton;
