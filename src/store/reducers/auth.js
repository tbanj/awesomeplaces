/* eslint-disable prettier/prettier */

import { AUTH_GREETING_STATE, AUTH_LOGIN, AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN } from '../actions/actionTypes';

const initialState = {
    token: { token: null, expiredDate: null },
    isLogin: false,
    greetingState: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLogin: true,
            };

        case AUTH_GREETING_STATE:
            return {
                ...state,
                greetingState: action.greetingState,
            };

        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: { ...state.token, token: null, expiredDate: null },
            };

        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };

        default:
            return state;
    }
};

export default reducer;

