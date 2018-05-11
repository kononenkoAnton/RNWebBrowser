import React from 'react';
import { TouchableOpacity } from 'react-native';

const ButtonFullScreen = ({ onPress, children, style, activeOpacity = 0.2 }) => (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            style={style}
        >
            {children}
        </TouchableOpacity>
     );

export { ButtonFullScreen };
