import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import sprite from './sprite.svg';

const Icon = ({ iconName, classProp, style, iconColor, fontSize }) => (
  <SvgIcon
    style={style}
    className={classProp}
    htmlColor={iconColor}
    fontSize={fontSize}
  >
    <use href={`${sprite}#${iconName}`} />
  </SvgIcon>
);

Icon.propTypes = {
  iconName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  classProp: PropTypes.string,
  iconColor: PropTypes.string,
  fontSize: PropTypes.string,
};

Icon.defaultProps = {
  iconName: '',
  style: {},
  classProp: '',
  iconColor: '',
  fontSize: 'default',
};

export default Icon;
