import { View, WebView, StyleSheet, StatusBar, Clipboard, Linking, Animated, PanResponder, Share, Platform } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { webUrlUpdated, webViewCanGoBack, webViewCanGoForward } from './Redux/Actions';
import Toolbar from './Components/Toolbar';
import BottomToolBar from './Components/BottomToolBar';
import { checkValidUrl } from './Utils/Helpers';

const WEBVIEW_REF = 'webview';

class WebBrowser extends Component {
  componentWillMount() {
    this.props.webUrlUpdated(this.props.url);
  }

  onBack = () => {
    //TODO: Will go back from presentation
    
  };

  onWebViewBack = () => {
    if (this.props.canGoBack === true) {
      this.refs[WEBVIEW_REF].goBack();
    }
  }

  onWebViewForward = () => {
    if (this.props.canGoForward === true) {
      this.refs[WEBVIEW_REF].goForward();
    }
  }

  onCopyURL = () => {
    //TODO copy url
    Clipboard.setString(this.props.urlString);
    const content = Clipboard.getString();
  }

  onNavigationStateChange = navState => {
    this.props.webViewCanGoBack(navState.canGoBack);
    this.props.webViewCanGoForward(navState.canGoForward);
  };
  
  onWebViewReload = () => {
    this.refs[WEBVIEW_REF].reload();
  };

  onShareButtonDidPush = () => {
    console.log('onShareButtonDidPush');
    Share.share({
      message: 'Wow, have you seen that?',
      url: this.props.urlString,
      title: 'Wow, have you seen that?'
    });
  }

  onOpenExternalURL = () => {
    Linking.openURL(this.props.urlString);
  }

  startAnimation() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 0,
        duration: 2000,
      }
    ).start();
  }

  render() {
    const statusBarHidden = true;
    const HEADER_MAX_HEIGHT = 200;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    return (
      <View 
        style={styles.container}  
      >
        <StatusBar
          backgroundColor="blue"
          barStyle="dark-content"
          hidden={statusBarHidden}
        />
  
        <Toolbar
          onBack={this.onBack}
          onWebViewReload={this.onWebViewReload}
          onShareButtonDidPush={this.onShareButtonDidPush}
        />
        <WebView
          ref={WEBVIEW_REF}
          source={{ uri: this.props.urlString }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={styles.webView}
        />
        <BottomToolBar 
          onWebViewBack={this.onWebViewBack}
          onWebViewForward={this.onWebViewForward}
          onCopyURL={this.onCopyURL}
          onOpenExternalURL={this.onOpenExternalURL}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
  webView: {
    flex: 1,
  },

  header: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#03A9F4',
    // overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

WebBrowser.propTypes = {
  url: PropTypes.string.isRequired,
};

WebBrowser.defaultProps = {
  url: 'https://google.com',
};

const mapStateToProps = ({ webView }) => {
  const { urlString, canGoBack, canGoForward } = webView;

  return { urlString, canGoBack, canGoForward };
};

export default connect(mapStateToProps, {
  webUrlUpdated,
  webViewCanGoBack,
  webViewCanGoForward,
})(WebBrowser);
