/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/maintabs/startMainTabs';
import { getData, storeData } from '../../lib/asyncStorage';


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
            .then(async (parsedRes) => {
                dispatch(uiStopLoading);
                if (!parsedRes.idToken) {
                    Alert.alert('Authentication, email or password not correct');
                }
                else {
                    console.log('parsedRes auth', parsedRes.idToken);
                    // await Promise.resolve(storeData('mp:auth:token', parsedRes.idToken));
                    dispatch(authStoreToken(parsedRes.idToken));
                    // dispatch(authLogin());
                    Navigation.setRoot(startMainTabs);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Network issues, please retry');
                dispatch(uiStopLoading);
            });

    };
};

export const authLogin = () => {
    return {
        type: AUTH_LOGIN,
    };
};

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    };
};

export const authSetToken = (token) => {
    console.log('authSetToken action', token);
    return {
        type: AUTH_SET_TOKEN,
        token,
    };
};

export const authStoreToken = (token) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const deriveToken = storeData('mp:auth:token', token);
            if (!deriveToken) { dispatch(authSetToken(token)); }
            else { resolve(deriveToken); }
        });
    };
};


export const authGetToken = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                getData('mp:auth:token')
                    .then(tokenParse => {
                        dispatch(authSetToken(tokenParse))
                        resolve(tokenParse);
                    }
                    )
                    .catch(error => reject('unable to fetch error encounter'));
            }
            else { resolve(token); }
            return token;
        });
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(err => {
                console.log(err);
                Alert.alert('Failed to fetch token');
            })
            .then(token => {
                console.log('token signin', token);
                Navigation.setRoot(startMainTabs);

            })
            ;
    };
};

