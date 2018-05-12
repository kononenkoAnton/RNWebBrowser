import { View, WebView, StyleSheet, StatusBar, Clipboard, Linking } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { webUrlUpdated, webViewCanGoBack, webViewCanGoForward } from './Redux/Actions';
import Toolbar from './Components/Toolbar';
import BottomToolBar from './Components/BottomToolBar';
import MoreOptionsModal from './Components/MoreOptionsModal';
import { checkValidUrl } from './Utils/Helpers';

const WEBVIEW_REF = 'webview';

class WebBrowser extends Component {
  state = {
    isMoreOptionsModalVisible: false
  }

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
    console.log('Clipboard');
    const content = Clipboard.getString();
    console.log(content);
  }

  onNavigationStateChange = navState => {
    this.props.webViewCanGoBack(navState.canGoBack);
    this.props.webViewCanGoForward(navState.canGoForward);
  };
  
  onWebViewReload = () => {
    this.refs[WEBVIEW_REF].reload();
  };

  onMoreButtonDidPush = () => {
    console.log('onMoreButtonDidPush');

    //TODO: Add Modal View 
    this.setState({
      isMoreOptionsModalVisible: true
    });
  }

  onModalScreenClose = () => {
    this.setState({
      isMoreOptionsModalVisible: false,
    });
  }

  onOpenExternalURL = () => {
    Linking.openURL(this.props.urlString);
  }

  moreOptionsModalPresentation() {
    console.log(this.state.isMoreOptionsModalVisible);

    if (this.state.isMoreOptionsModalVisible) {
      return (
        <MoreOptionsModal
          onWebViewBack={this.onWebViewBack}
          onModalScreenClose={this.onModalScreenClose}
        />
      );
    }
    return;
  }

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
          onBack={this.onBack}
          onWebViewReload={this.onWebViewReload}
          onMoreButtonDidPush={this.onMoreButtonDidPush}
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
       {this.moreOptionsModalPresentation()}
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
