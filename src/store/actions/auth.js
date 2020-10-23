/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AUTH_LOGIN, AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN } from './actionTypes';
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
            .then(res => res.json())
            .then(async (parsedRes) => {
                dispatch(uiStopLoading);
                if (!parsedRes.idToken) {
                    Alert.alert('Authentication, email or password not correct');
                }
                else {
                    // await Promise.resolve(storeData('mp:auth:token', parsedRes.idToken));

                    // dispatch(authLogin());
                    Navigation.setRoot(startMainTabs);
                    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
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
    return async (dispatch) => {

        dispatch(authClearStorage('mp:auth:token'));
        const logSuccess = await dispatch(authClearStorage('mp:auth:refreshToken'));
        if (logSuccess) {
            console.log('logSuccess');
            Navigation.setRoot({
                root: { component: { name: 'AuthScreen' } },
            });
            dispatch(authRemoveToken())
        }
    }
};

export const authSetToken = (token) => {
    console.log('set', token);
    return {
        type: AUTH_SET_TOKEN,
        token: token,
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const expiredDate = new Date().getTime() + 20 * 1000;
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
            const token = getState().auth.token;
            if (!token.token) {


                try {
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
                        else {
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
                                    // return { token: res.id_token, expiredDate: res.expires_in };
                                    resolve({ token: res.id_token, expiredDate: res.expires_in });
                                }

                            } else {
                                reject('no refresh token derive');
                                return;
                            }
                        }
                        return parseData;
                    }

                } catch (error) {
                    reject('no token found');
                    dispatch(authClearStorage('mp:auth:token'));
                    dispatch(authClearStorage('mp:auth:refreshToken'));
                }

            }
            else {
                resolve(token);
                // return;
            }
            // return token;
        });
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())

            .then(token => {
                console.log('is there token ', token);
                if (token) {

                    Navigation.setRoot(startMainTabs);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Failed to fetch token');
            })
            ;
    };
};

export const authClearStorage = (key) => {
    return async (dispatch) => {
        return await clearStorage(key);
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};

export const authRetrieveToken = () => {
    return async dispatch => {
        // try {
        //     const obtainToken = await getObjData('mp:auth:token');
        //     console.log('obtainToken ', obtainToken);
        //     // dispatch(authSetToken(obtainToken));
        // } catch (error) {

        // }
        const obtainToken = await getObjData('mp:auth:token');
        console.log('obtainToken ', obtainToken);
    };
};






