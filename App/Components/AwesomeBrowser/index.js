import { View, WebView, StyleSheet, StatusBar } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import { checkValidUrl } from '../../Utils/Helpers';

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
      url: this.props.url,
      utlToPresent: this.props.url,
    };
  }

  onBack = () => {
    if (this.state.canGoBack === true) {
      this.refs[WEBVIEW_REF].goBack();
    }
  };

  onForward = () => {
    if (this.state.canGoForward === true) {
      this.refs[WEBVIEW_REF].goForward();
    }
  };

  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
    });
  };
  
  reloadWebView = (url) => {
    if (url) {
      const newURL = checkValidUrl(url);
      this.setState({
        urlToPresent: url,
        url: newURL
      });
    } else {
      this.refs[WEBVIEW_REF].reload();
    }
  };

  render() {
    const statusBarHidden = true;

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
          onWebViewBack={this.onBack}
          onWebViewForward={this.onForward}
          onWebViewReload={this.reloadWebView}
          url={this.state.utlToPresent}
        />
        <WebView
          ref={WEBVIEW_REF}
          source={{ uri: this.state.url }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={styles.webView}
        />
      </View>
    );
  }
}

AwesomeBrowser.propTypes = {
  url: PropTypes.string.isRequired,
};

AwesomeBrowser.defaultProps = {
  url: 'https://google.com',
};
