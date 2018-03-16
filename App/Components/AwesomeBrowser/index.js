import { View, WebView, StyleSheet, StatusBar } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
  webView: {
    flex: 1,
  },
});
const WEBVIEW_REF = 'webview';

export default class AwesomeBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
      canGoForward: false,
    };
  }

  render() {
    const statusBarHidden = true;
    console.log(this.state.canGoBack);

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="dark-content"
          hidden={statusBarHidden}
        />

        <Toolbar
          canGoBack={this.state.canGoBack}
          canGoForward={this.state.canGoForward}
          goWebViewBack={this.onBack}
          goWebViewForward={this.onForward}
          goWebViewRefresh={this.reloadWebView}
          uri={this.props.uri}
        />
        <WebView
          ref={WEBVIEW_REF}
          source={{ uri: this.props.uri }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={styles.webView}
        />
      </View>
    );
  }
}

reloadWebView = () => {
  this.refs[WEBVIEW_REF].reload();
};
onBack = () => {
  this.refs[WEBVIEW_REF].goBack();
};

onForward = () => {
  this.refs[WEBVIEW_REF].goForward();
};

onNavigationStateChange = navState => {
  this.setState({
    canGoBack: navState.canGoBack,
    canGoForward: navState.canGoForward,
  });
};

AwesomeBrowser.propTypes = {
  uri: PropTypes.string.isRequired,
};

AwesomeBrowser.defaultProps = {
  uri: 'https://google.com',
};
