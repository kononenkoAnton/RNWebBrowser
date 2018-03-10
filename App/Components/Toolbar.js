import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VectorIconButton from './VectorIconButton';
import VectorIcon from './VectorIcon';

import {
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6EF',
        flexDirection: 'row',
        height: 44,
        alignItems:'center',        
      },
    closeButton: {
    },
    searchContainer: {       
        paddingLeft: 20,
        paddingRight: 20, 
        flexDirection: 'row',        
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        flex: 1,
        height: 34, 
        justifyContent: 'center',
        alignItems:'center',      
        
    },
    moreButton: {
        width: 38,
        justifyContent: 'center',
        alignItems:'center',
    },

    refreshButton: {
        width: 42,
        justifyContent: 'center',
        alignItems:'center',
    }

})

export default class Toolbar extends Component {
    urlInputPresentation() {
        if (this.props.allowUrlInput == true) {
            return <Text
                    numberOfLines={ 1 }
                    >{ this.props.url }</Text>;
        } else {
            return <Text
                numberOfLines={ 1 }
            >{ this.props.url }</Text>;
        }
    }
    shareButtonPresentation() {
        if (this.props.shareButtonEnabled == true) {
            return  <TouchableOpacity style={styles.moreButton}>
                            <VectorIcon 
                                libraryName= { 'ENTYPO' }
                                iconName= { 'dots-three-vertical' }
                                size= { 30 } />
                        </TouchableOpacity>;
        } else {
            return
        }
    }
    render() {
      const { height } = this.props;
      const customStyles = StyleSheet.create({ height });
      
      
      const lockImage = this.props.allowUrlInput ? "lock" : "unlock"
      return (
        <View style={[styles.container, customStyles]}>
            { this.shareButtonPresentation() }

            <TouchableOpacity style={styles.refreshButton}>
                <VectorIcon 
                    libraryName= { 'ION_ICONS' }
                    iconName= { 'ios-refresh' }
                    size= { 30 }
                    color= { '#007AFF' } />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <VectorIcon 
                            libraryName= { 'EVILICONS' }
                            iconName= { lockImage }
                            size= { 25 } />

                { this.urlInputPresentation() }

            </View>
                <Button 
                    style={styles.closeButton}
                    title={ 'Done' } />
        </View>
      );
    }
  }

Toolbar.propTypes = {
    url: PropTypes.string,
    shareButtonEnabled: PropTypes.bool,
    allowUrlInput: PropTypes.bool,
    height: PropTypes.number,
};

Toolbar.defaultProps = {
    url: 'https://google.com',
    allowUrlInput: true,
    shareButtonEnabled: false
};
