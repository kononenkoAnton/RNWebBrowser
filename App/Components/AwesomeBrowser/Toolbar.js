import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VectorIcon } from './VectorIcon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#C7C7CD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  refreshButton: {
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    alignItems: 'stretch',
  },

  textURL: {
    color: 'grey',
  },
});

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { textURL: props.url };
  }

  urlInputPresentation() {
    if (this.props.allowUrlInput === true) {
      const { textURL } = this.state;

      return (
        <TextInput
          textAlign={'center'}
          style={styles.textInput}
          placeholder="Type to enter URL"
          value={textURL}
          onChangeText={textURLString => this.setState({ textURL: textURLString })}
          returnKeyType="done"
          clearButtonMode="while-editing"
          onSubmitEditing={() => this.props.onWebViewReload(this.state.textURL)}
          autoCapitalize={'none'}
        />
      );
    }
    return (
      <View style={styles.searchContainer}>
        <VectorIcon libraryName={'EVILICONS'} iconName={'lock'} size={25} />
        <Text style={styles.textURL} numberOfLines={1}>
          {this.props.url}
        </Text>
      </View>
    );
  }
  shareButtonPresentation() {
    if (this.props.shareButtonEnabled === true) {
      return (
        <TouchableOpacity style={styles.moreButton}>
          <VectorIcon
            libraryName={'ENTYPO'}
            iconName={'dots-three-vertical'}
            size={30}
            color={'#007AFF'}
          />
        </TouchableOpacity>
      );
    } 
    return;    
  }
  presentReloadButton() {
    if (this.props.allowUrlInput === false) {
      return (
        <TouchableOpacity 
        style={styles.refreshButton}
          onPress={() => this.props.onWebViewReload()}
        >
          <VectorIcon
            libraryName={'ION_ICONS'}
            iconName={'ios-refresh'}
            size={30}
            color={'#007AFF'}
          />
        </TouchableOpacity>
      );
    } 
  }
  render() {
    const { height } = this.props;
    const paddingLeft = this.props.allowUrlInput === true ? 10 : 0;
    const customStyles = {
      height,
      paddingLeft,
    };
    return (
      <View style={[styles.container, customStyles]}>
        {this.shareButtonPresentation()}

        <TouchableOpacity
          onPress={this.props.goWebViewBack}
          style={styles.moreButton}
          activeOpacity={this.props.canGoForward ? 0.2 : 1}
          onPress={
            this.props.onWebViewBack
          }
        >
          <VectorIcon
            libraryName={'ION_ICONS'}
            iconName={'ios-arrow-back'}
            size={30}
            color={this.props.canGoBack ? '#007AFF' : '#d3d3d3'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreButton}
          activeOpacity={this.props.canGoForward ? 0.2 : 1}
          onPress={
            this.props.onWebViewForward
          }
        >
          <VectorIcon
            libraryName={'ION_ICONS'}
            iconName={'ios-arrow-forward'}
            size={30}
            color={this.props.canGoForward ? '#007AFF' : '#d3d3d3'}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.searchContainer,
            { height: ((this.props.height / 100) * 70) },
          ]}
        >
        {this.urlInputPresentation()}
        </View>
        {this.presentReloadButton()}

        <Button style={styles.closeButton} title={'Done'} />
      </View>
    );
  }
}

Toolbar.propTypes = {
  url: PropTypes.string.isRequired,
  shareButtonEnabled: PropTypes.bool,
  allowUrlInput: PropTypes.bool,
  height: PropTypes.number,
  canGoForward: PropTypes.bool.isRequired,
  canGoBack: PropTypes.bool.isRequired,
  onWebViewForward: PropTypes.func.isRequired,
  onWebViewBack: PropTypes.func.isRequired,
  onWebViewReload: PropTypes.func.isRequired
};

Toolbar.defaultProps = {
  allowUrlInput: true,
  shareButtonEnabled: true,
  height: 44,
};
