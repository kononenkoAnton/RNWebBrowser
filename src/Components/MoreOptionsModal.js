import {
    View,
    Modal,
    StyleSheet,
    Animated,
    PanResponder,
} from 'react-native';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VectorIcon } from './VectorIcon';
import { ButtonFullScreen } from './common';

class MoreOptionsModal extends Component {
    state = {
        fadeAnim: new Animated.Value(1),
        readyToClose: false,
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,

            onPanResponderMove: (evt, gestureState) => {
                console.log(gestureState);
                this.calculateNewOpacity(gestureState);
            },
            onPanResponderRelease: () => {
                if (this.state.readyToClose === true || this.state.fadeAnim._value < 0.4) {
                    this.onScreenClose();
                } else {
                    this.revertAnimation(() => {
                        // this.setState({
                        //     fadeAnim: new Animated.Value(1),
                        //     readyToClose: false,
                        // });
                    });
                }
            }
        });
    }

    onScreenClose = () => {
        this.startAnimation(() => this.props.onModalScreenClose());
    }

    revertAnimation(completion) {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 200,
            }
        ).start(completion);
    }
    startAnimation(completion) {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 200,
            }
        ).start(completion);
    }

    calculateNewOpacity(gestureState) {
        console.log(gestureState.moveY);

        if (gestureState.moveY > 0) {
            const value = (1 - (-gestureState.dy / 200));
            let newOpacity = Math.round(value * 100) / 100;
            let readyToClose = this.state.readyToClose;
            console.log(newOpacity);

            if (newOpacity > 0.0 && this.state.readyToClose === false) {
                if (newOpacity < 0.05) {
                    newOpacity = 0;
                    readyToClose = true;
                }
                this.setState({
                    fadeAnim: new Animated.Value(newOpacity),
                    readyToClose
                });
            }
        }
    }

    render() {
        const { container } = styles;
        const { fadeAnim } = this.state;
        return (
                <Modal 
                    animationType='fade'
                    transparent
                    visible
                >
                <Animated.View  
                    {...this.panResponder.panHandlers} 
                    style={{
                        flex: 1,
                        opacity: fadeAnim
                    }}
                >
                    <ButtonFullScreen          
                        activeOpacity={1}
                        onPress={this.onScreenClose}
                        style={container}
                    >
               
                        <View />

                    </ButtonFullScreen>
                </Animated.View>
                </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
});

MoreOptionsModal.propTypes = {
    onWebViewBack: PropTypes.func.isRequired,
    onModalScreenClose: PropTypes.func.isRequired
};

MoreOptionsModal.defaultProps = {
    allowUrlInput: false,
};

const mapStateToProps = ({ webView }) => {
    const { canGoBack } = webView;

    return { canGoBack };
};

export default connect(mapStateToProps, {})(MoreOptionsModal);
