import { combineReducers } from "redux";
import webView from "./WebViewReducer";
import styles from "./styles";

export default combineReducers({
  webView,
  styles
});
