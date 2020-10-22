/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/maintabs/startMainTabs';
import { getData, getObjData, storeData, storeObjData, clearStorage } from '../../lib/asyncStorage';


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
                    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
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

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const expiredDate = new Date().getTime() + expiresIn * 1000;
            console.log('expiredDate', new Date(expiredDate));
            const deriveToken = storeObjData('mp:auth:token', { token, expiredDate: expiredDate + '' });

            if (!deriveToken) {
                reject();
                return;
            }
            else {
                dispatch(authSetToken({ token, expiredDate: expiredDate + '' }));
                resolve(deriveToken);
            }
        });
    };
};


export const authGetToken = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const token = getState().auth.token;
            console.log('from state', token);
            if (!token.token) {
                getObjData('mp:auth:token')
                    .then(parseData => {
                        console.log('parseData', parseData);
                        const parsedExpiryDate = new Date(parseInt(parseData.expiredDate, 10));
                        const now = new Date();
                        console.log('parsedExpiryDate', parsedExpiryDate);
                        console.log('now', now);
                        if (!parseData.token) {
                            reject();
                            return;
                        }
                        // dispatch(authSetToken(parseData));
                        // resolve(parseData);
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(parseData));
                            resolve(parseData);
                        } else {
                            console.log('am here');
                            dispatch(authClearStorage('mp:auth:token'))
                            reject();
                        }
                    }
                    )
                    .catch(error => {

                        reject('unable to fetch error encounter')
                    });
            }
            else { resolve(token); }
            return token;
        });
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())

            .then(token => {
                console.log('token signin', token.token);
                Navigation.setRoot(startMainTabs);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Failed to fetch token');
            })
            ;
    };
};

export const authClearStorage = (key) => {
    return key;
}


