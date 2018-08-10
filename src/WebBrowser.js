import { View, WebView, StyleSheet, StatusBar, Clipboard, Linking, Animated, PanResponder, Text } from 'react-native';
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
    isMoreOptionsModalVisible: false,
    fade: new Animated.Value(44)
  }

  componentWillMount() {
    this.props.webUrlUpdated(this.props.url);
    this.startAnimation();

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        // console.log(`onPanResponderMove ${-gestureState.dy}`);
        this.setState({
          scrollY: new Animated.Value(-gestureState.dy)
        });
      },

      onPanResponderRelease: () => {
        console.log('onPanResponderRelease');
      }
    });
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

  startAnimation() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 0,
        duration: 2000,
      }
    ).start();
  }

  moreOptionsModalPresentation() {

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
    const HEADER_MAX_HEIGHT = 200;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    // const headerHeight = this.state.scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    //   extrapolate: 'clamp',
    // });
    return (
      <View 
        style={styles.container}  
        // {...this.panResponder.panHandlers}       
      >
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

        {/* <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Title</Text>
          </View>
        </Animated.View> */}
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
