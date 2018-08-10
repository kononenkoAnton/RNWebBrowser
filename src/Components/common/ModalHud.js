import {
    Modal,
    StyleSheet,
    Animated,
    Text
} from 'react-native';
import React, { Component } from 'react';
import { VectorIcon } from './VectorIcon';

export default class ModalHud extends Component {
    render() {
        const { textAlert, containerAlert } = styles;
        return (
            <Modal
                animationType='fade'
                transparent
                visible
            >
                <Animated.View style={containerAlert}>
                    <VectorIcon
                        libraryName={'ION_ICONS'}
                        iconName={'ios-refresh'}
                        size={30}
                        color={'#007AFF'}
                    />
                    <Text style={textAlert}> Saved! </Text>
                </Animated.View>
            </Modal> 
        );
    }
}

const styles = StyleSheet.create({
    containerAlert: {
        // paddingLeft: 10,
        // paddingRight: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // flexDirection: 'row',
        // alignItems: 'center',
        // borderRadius: 5,
        // borderWidth: 1,
        // flex: 1,
        // borderColor: 'rgba(0, 0, 0, 0)',
    },

    textAlert: {
        color: 'grey',
        textAlign: 'center'
    },
});

