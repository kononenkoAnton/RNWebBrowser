import { View, WebView, StyleSheet, StatusBar } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { webUrlUpdated, webViewCanGoBack } from './Redux/Actions';
import Toolbar from './Components/Toolbar';
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

  onWebViewBack() {
    if (this.props.canGoBack === true) {
      this.refs[WEBVIEW_REF].goBack();
    }
  }

  onNavigationStateChange = navState => {
    this.props.webViewCanGoBack(navState.canGoBack);
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
  const { urlString, canGoBack } = webView;

  return { urlString, canGoBack };
};

export default connect(mapStateToProps, {
  webUrlUpdated,
  webViewCanGoBack,
})(WebBrowser);
