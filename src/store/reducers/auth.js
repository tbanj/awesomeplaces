/* eslint-disable prettier/prettier */

import { AUTH_LOGIN, AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN } from '../actions/actionTypes';

const initialState = {
    token: { token: null, expiredDate: null },
    isLogin: false,
};

const reducer = (state = initialState, action) => {
    switch (action.key) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLogin: true,
            };

        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: { token: null, expiredDate: null },
            };

        case AUTH_SET_TOKEN:
            console.log('action.token', action.token);
            return {
                ...state,
                token: action.token,
            };

        default:
            return state;
    }
};

export default reducer;

