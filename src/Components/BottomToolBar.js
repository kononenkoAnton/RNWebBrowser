import {
    View,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VectorIcon } from './VectorIcon';
import { Button } from './common';

class BottomToolBar extends Component {
    backButtonPresentation() {
        return (
            <Button
                style={styles.moreButton}
                onPress={this.props.onWebViewBack}
                activeOpacity={this.props.canGoBack ? 0.2 : 1}
            >

                <VectorIcon
                    libraryName={'AWESOME'}
                    iconName={'caret-left'}
                    size={20}
                    color={this.props.canGoBack ? 'grey' : 'lightgray'}
                />
            </Button>
        );
    }

    forwardButtonPresentation() {
        return (
            <Button
                style={styles.moreButton}
                onPress={this.props.onWebViewForward}
                activeOpacity={this.props.canGoForward ? 0.2 : 1}
            >

                <VectorIcon
                    libraryName={'AWESOME'}
                    iconName={'caret-right'}
                    size={20}
                    color={this.props.canGoForward ? 'grey' : 'lightgray'}
                />
            </Button>
        );
    }

    copyURLButtonPresentation() {
        return (
            <Button
                style={styles.moreButton}
                onPress={this.props.onCopyURL}
            >

                <VectorIcon
                    libraryName={'AWESOME'}
                    iconName={'copy'}
                    size={20}
                    color={'grey'}
                />
            </Button>
        );
    }

    safariButtonPresentation() {
        return (
            <Button
                style={styles.moreButton}
                onPress={this.props.onOpenExternalURL}
            >

                <VectorIcon
                    libraryName={'AWESOME'}
                    iconName={'safari'}
                    size={20}
                    color={'grey'}
                />
            </Button>
        );
    }

    render() {
        const { height } = this.props;
        const customStyles = {
            height,
        };
        const { container } = styles;
        return (
            <View style={[container, customStyles]}>
                {this.backButtonPresentation()}
                {this.forwardButtonPresentation()}
                {this.copyURLButtonPresentation()}
                {this.safariButtonPresentation()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'darkgray',
        borderTopWidth: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
});

BottomToolBar.propTypes = {
    height: PropTypes.number,
    onWebViewBack: PropTypes.func.isRequired,
    onWebViewForward: PropTypes.func.isRequired,
    onCopyURL: PropTypes.func.isRequired,
    onOpenExternalURL: PropTypes.func.isRequired,
};

BottomToolBar.defaultProps = {
    allowUrlInput: false,
    height: 44,
};

const mapStateToProps = ({ webView }) => {
    const { urlString, canGoBack, canGoForward } = webView;

    return { urlString, canGoBack, canGoForward };
};

export default connect(mapStateToProps, {})(BottomToolBar);
