import {
    WEB_URL_UPDATED,
    WEB_VIEW_CAN_GO_BACK,
} from '../Actions/types';

const INITIAL_STATE = {
    urlString: '',
    canGoBack: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WEB_URL_UPDATED:
            return { ...state, urlString: action.payload };
        case WEB_VIEW_CAN_GO_BACK:
            return { ...state, canGoBack: action.payload };
        default:
            return state;
    }
};
