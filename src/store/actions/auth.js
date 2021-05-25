/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import auth from '@react-native-firebase/auth';
import { AUTH_GREETING_STATE, AUTH_LOGIN, AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/maintabs/startMainTabs';
import { getData, getObjData, storeData, storeObjData, clearStorage } from '../../lib/asyncStorage';

const apiKey = 'AIzaSyAmtanoUXSYtXhr0JeU1do4V_6kWTNWRwE';


export const tryAuth = (authData, authMode) => {

    return dispatch => {
        dispatch(uiStartLoading);

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
            .then(res => {

                if (res.status === 400) { return res.json(); }
                if (res.ok) {
                    return res.json();
                } else { throw new Error('network error'); }
            })
            .then(async (parsedRes) => {
                dispatch(uiStopLoading);
                if (!parsedRes.idToken) {
                    Alert.alert('Authentication failed ' + parsedRes.error.message);
                }
                else {
                    auth()
                        .signInWithEmailAndPassword(authData.email, authData.password)
                        .then((data) => {

                            if (data) {
                                Navigation.setRoot(startMainTabs);
                                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                            }
                        })
                        .catch(error => {
                            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                                // Alert.alert('Invalid email or password!');
                            }
                            console.error(error);
                        });
                }
            })
            .catch(err => {
                console.warn(err);
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
    return async (dispatch, getState) => {
        dispatch(authRemoveToken());
        dispatch(authClearStorage('mp:auth:token'));
        dispatch(authClearStorage('mp:auth:refreshToken'));
        Navigation.setRoot({
            root: { component: { name: 'AuthScreen' } },
        });
    };
};

export const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const expiredDate = new Date().getTime() + expiresIn * 1000;
            const deriveToken = storeObjData('mp:auth:token', { token, expiredDate: expiredDate + '' });
            storeData('mp:auth:refreshToken', refreshToken);

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
        return new Promise(async (resolve, reject) => {
            try {
                const token = getState().auth.token;
                if (token.token === null || new Date(parseInt(token.expiredDate, 10)) <= new Date()) {

                    const parseData = await getObjData('mp:auth:token');
                    if (parseData) {
                        const parsedExpiryDate = new Date(parseInt(parseData.expiredDate, 10));
                        const now = new Date();
                        if (!parseData.token) {
                            reject();
                            return;
                        }
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(parseData));
                            resolve(parseData);
                            return;
                        }
                        else if (parsedExpiryDate < now) {
                            const setRefresh = await getData('mp:auth:refreshToken');
                            if (setRefresh) {
                                const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    body: 'grant_type=refresh_token&refresh_token=' + setRefresh,
                                });
                                const res = await response.json();
                                if (res.id_token) {
                                    await dispatch(authStoreToken(res.id_token, res.expires_in, res.refresh_token));
                                    resolve({ token: res.id_token, expiredDate: res.expires_in });
                                }

                            } else {
                                reject('no refresh token derive');
                                return;
                            }
                        }
                        return parseData;
                    }
                }


                else {
                    resolve(token);
                }

            } catch (error) {
                reject('no token found');
                dispatch(authClearStorage('mp:auth:token'));
                dispatch(authClearStorage('mp:auth:refreshToken'));
            }

        });
    };
};

export const authAutoSignIn = () => {
    return (dispatch) => {
        dispatch(authGetToken())

            .then(token => {
                if (token) {
                    Navigation.setRoot(startMainTabs);
                }
            });

    };
};

export const authClearStorage = (key) => {
    return async (dispatch) => {
        return await clearStorage(key);
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};

export const authRetrieveToken = () => {
    return async dispatch => {
        try {
            await getObjData('mp:auth:token');
        } catch (error) {
            console.warn('error encounter');
        }
    };
};

export const authGreetingState = () => {
    return {
        type: AUTH_GREETING_STATE,
        greetingState: true,
    };
};







