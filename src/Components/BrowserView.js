import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { VectorIcon } from './VectorIcon';
import { Button } from './common';
import { webUrlUpdated } from '../Redux/Actions';

class BrowserView extends Component {
    reloadButton() {
        return (
            <Button onPress={this.props.onWebViewReload}>
                <VectorIcon
                    libraryName={'ION_ICONS'}
                    iconName={'ios-refresh'}
                    size={30}
                    color={'#007AFF'}
                />
            </Button>
        );
    }
    
    render() {
        const { container, urlPlaceholderContainer, textUrl } = styles;
        const newContainerStyles = [container, { backgroundColor: this.props.backgroundColor }];
        return (
            <View style={newContainerStyles}> 
                <View style={urlPlaceholderContainer}>
                    <VectorIcon libraryName={'EVILICONS'} iconName={'lock'} size={25} />
                    <Text 
                        numberOfLines={1}
                        style={textUrl}
                    >
                        {this.props.urlString}
                    </Text>
                </View>
                <View style={{ width: 10 }} />
                {this.reloadButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F6F6EF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        flex: 1,
        borderColor: 'rgba(0, 0, 0, 0)',
    },
    textUrl: {
        color: 'grey',
        textAlign: 'center'
    },

    urlPlaceholderContainer: {
        backgroundColor: '#F6F6EF',
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

BrowserView.propTypes = {
    onWebViewReload: PropTypes.func.isRequired,
    allowUrlInput: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

BrowserView.defaultProps = {
    allowUrlInput: false,
    backgroundColor: '#F6F6EF',
};

const mapStateToProps = ({ webView }) => {
    const { urlString } = webView;

    return { urlString };
};

export default connect(mapStateToProps, {
    webUrlUpdated
})(BrowserView);
