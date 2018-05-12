
import {
    WEB_URL_UPDATED,
    WEB_VIEW_CAN_GO_BACK,
    WEB_VIEW_CAN_GO_FORWARD,
} from './types';

export const webUrlUpdated = urlString => ({
        type: WEB_URL_UPDATED,
        payload: urlString
});

export const webViewCanGoBack = value => ({
    type: WEB_VIEW_CAN_GO_BACK,
    payload: value
});

export const webViewCanGoForward = value => ({
    type: WEB_VIEW_CAN_GO_FORWARD,
    payload: value
});
