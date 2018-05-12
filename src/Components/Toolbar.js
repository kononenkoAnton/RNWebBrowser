import {
    View,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VectorIcon } from './VectorIcon';
import BrowserView from './BrowserView';
import { Button } from './common';

class Toolbar extends Component {
    onMoreButtonDidPush = () => {
        //TODO Remove future anitmation here
        this.props.onMoreButtonDidPush();
    }
    
    moreButtonPresentation() {
        return (
            <Button 
                style={styles.moreButton}
                onPress={this.onMoreButtonDidPush}
            >
                
                <VectorIcon
                    libraryName={'ENTYPO'}
                    iconName={'dots-three-vertical'}
                    size={30}
                    color={'#007AFF'}
                />
            </Button>
        );
    }

    backButton() {
        return (
            <Button
                onPress={this.props.onBack}
                style={styles.moreButton}
            >
                <VectorIcon
                    libraryName={'ION_ICONS'}
                    iconName={'ios-arrow-back'}
                    size={30}
                    color={'#007AFF'}
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
                {this.backButton()}
                <BrowserView 
                    backgroundColor='blue'
                    onWebViewReload={this.props.onWebViewReload}
                />
                {this.moreButtonPresentation()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'row',
        alignItems: 'center',    
    },
    moreButton: {
        width: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

Toolbar.propTypes = {
    height: PropTypes.number,
    onBack: PropTypes.func.isRequired,
    onWebViewReload: PropTypes.func.isRequired,
    onMoreButtonDidPush: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
    allowUrlInput: false,
    height: 44,
};

const mapStateToProps = ({ webView }) => {
    const { urlString } = webView;

    return { urlString };
};

export default connect(mapStateToProps, {})(Toolbar);
