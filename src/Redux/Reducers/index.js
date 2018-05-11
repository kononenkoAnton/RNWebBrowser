import { combineReducers } from 'redux';
import WebViewReducer from './WebViewReducer';

export default combineReducers({
    webView: WebViewReducer,
});
