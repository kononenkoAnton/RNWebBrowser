import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const availableLibraries = {
  ENTYPO: Entypo,
  EVILICONS: EvilIcons,
  AWESOME: FontAwesome,
  FOUNDATION: Foundation,
  MATERIAL: MaterialIcons,
  MATERIAL_COMMUNITY: MaterialCommunityIcons,
  OCTICONS: Octicons,
  ZOCIAL: Zocial,
  SIMPLE_LINE: SimpleLineIcons,
  ION_ICONS: Ionicons,
};

const VectorIcon = ({ libraryName, iconName, size, color = '#000' }) => {
  const { libraryName } = this.props;
  const Icon = availableLibraries[libraryName];
  return <Icon name={iconName} size={size} color={color} />;
};

VectorIcon.propTypes = {
  libraryName: PropTypes.oneOf(...Object.keys(availableLibraries)),
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
};
