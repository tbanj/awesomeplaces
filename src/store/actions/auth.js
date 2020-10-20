/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SET_TOKEN, TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/maintabs/startMainTabs';


export const tryAuth = (authData, authMode) => {

    return dispatch => {
        dispatch(uiStartLoading);
        const apiKey = 'AIzaSyAmtanoUXSYtXhr0JeU1do4V_6kWTNWRwE';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        if (authMode === 'login') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;


        }
        fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }),
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading);
                if (!parsedRes.idToken) {
                    Alert.alert('Authentication, email or password not correct');
                }
                else {
                    console.log('parsedRes auth', parsedRes.idToken);
                    dispatch(authSetToken(parsedRes.idToken))
                    // dispatch(authLogin());
                    Navigation.setRoot(startMainTabs);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Network issues, please retry');
                dispatch(uiStopLoading);
            })

    }
};

export const authLogin = () => {
    return {
        type: AUTH_LOGIN
    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const authSetToken = (token) => {
    console.log('authSetToken action', token);
    return {
        type: AUTH_SET_TOKEN,
        token,
    }
}


