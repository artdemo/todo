import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './Icon.styles';
import sprite from './Icon.sprite.svg';

export const Icon = ({
  iconName,
  classProp,
  style,
  iconColor,
  fontSize = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  // If fontSize is not passed set it depends on media query
  let iconSize = fontSize;

  if (!iconSize) iconSize = isXs ? 'small' : 'default';

  return (
    <SvgIcon
      style={style}
      className={`${classProp} ${classes.icon}`}
      htmlColor={iconColor}
      fontSize={iconSize}
    >
      <use href={`${sprite}#${iconName}`} />
    </SvgIcon>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  classProp: PropTypes.string,
  iconColor: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Icon.defaultProps = {
  iconName: '',
  style: {},
  classProp: '',
  iconColor: '',
  fontSize: false,
};
