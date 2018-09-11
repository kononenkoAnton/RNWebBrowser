import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./Redux/Reducers";
import WebBrowser from "./WebBrowser";

/**
 * fixes color - Zapp colors are AARRGGBB and output needs to be RRGGBBAA
 *
 * @param {string} input colorString
 * @returns {string} transformed color string
 */
export function fixColorHexCode(colorHex) {
  return `#${colorHex.slice(3, 9)}${colorHex.slice(1, 3)}`;
}

function parseStylesFromProps(props) {
  // extract & format the styles you need from the props
  // !!!! colors RGBA - use fixColorHexCode
  // return styles object you want to put in the store
}

export default class App extends Component {
  render() {
    const styles = parseStylesFromProps(this.props);

    const store = createStore(
      reducers,
      { styles },
      applyMiddleware(ReduxThunk)
    );

    return (
      <Provider store={store}>
        <WebBrowser {...this.props} />
      </Provider>
    );
  }
}
