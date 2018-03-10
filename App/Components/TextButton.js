import React, { Component } from 'react';
import VectorIcon from './VectorIcon';
import PropTypes from 'prop-types';

import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';

  export default class VectorIconButton extends Component {    
    render() {
      
    return (
        <TouchableOpacity>
            <Text> Done </Text> 
          </TouchableOpacity>
      );
    }
  }
  
VectorIconButton.propTypes = {
  libraryName : PropTypes.string.isRequired,
  iconName    : PropTypes.string.isRequired,
  size        : PropTypes.number.isRequired,
  color       : PropTypes.string    
};

VectorIconButton.defaultProps = {
    color: '#000'
};