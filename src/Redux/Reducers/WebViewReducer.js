import {
    WEB_URL_UPDATED,
    WEB_VIEW_CAN_GO_BACK,
    WEB_VIEW_CAN_GO_FORWARD,
} from '../Actions/types';

const INITIAL_STATE = {
    urlString: '',
    canGoBack: false,
    canGoForward: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WEB_URL_UPDATED:
            return { ...state, urlString: action.payload };
        case WEB_VIEW_CAN_GO_BACK:
            return { ...state, canGoBack: action.payload };
        case WEB_VIEW_CAN_GO_FORWARD:
            return { ...state, canGoForward: action.payload };
        default:
            return state;
    }
};
