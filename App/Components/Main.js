import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';

import {
    View,
    WebView,
    StyleSheet,
    StatusBar
  } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column'
      },
    toolbar: {        
        height: 44,
    },
    webView: {
        flex:1
    }
})

export default class Main extends Component {    
    render() {
        const statusBarHidden = true        
      return (
        <View style={styles.container}>
          
                <StatusBar
                backgroundColor="blue"
                barStyle="dark-content"
                hidden={statusBarHidden}
                />
                
                <Toolbar height={44} />
                <WebView
                source={{uri: 'https://google.com'}}
                style={ styles.webView }
                />
            </View>
      );
    }
  }    
  
