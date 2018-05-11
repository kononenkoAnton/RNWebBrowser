import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => (
        <TouchableOpacity
            onPress={onPress}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );

export { Button };
