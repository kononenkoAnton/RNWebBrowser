import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, activeOpacity }) => (
        <TouchableOpacity
            onPress={onPress}
            style={style}
            activeOpacity={activeOpacity}
        >
            {children}
        </TouchableOpacity>
    );

export { Button };
