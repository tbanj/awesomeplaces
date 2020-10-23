// /* eslint-disable prettier/prettier */
// import { Alert } from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SET_TOKEN } from './actionTypes';
// import { uiStartLoading, uiStopLoading } from './ui';
// import startMainTabs from '../../screens/maintabs/startMainTabs';
// import { getData, getObjData, storeData, storeObjData, clearStorage } from '../../lib/asyncStorage';

// const apiKey = 'AIzaSyAmtanoUXSYtXhr0JeU1do4V_6kWTNWRwE';
// export const tryAuth = (authData, authMode) => {

//     return dispatch => {
//         dispatch(uiStartLoading);

//         let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
//         if (authMode === 'login') {
//             url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

//         }
//         fetch(url,
//             {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     email: authData.email,
//                     password: authData.password,
//                     returnSecureToken: true,
//                 }),
//             })
//             .then(res => res.json())
//             .then(async (parsedRes) => {
//                 dispatch(uiStopLoading);
//                 if (!parsedRes.idToken) {
//                     Alert.alert('Authentication, email or password not correct');
//                 }
//                 else {
//                     // await Promise.resolve(storeData('mp:auth:token', parsedRes.idToken));
//                     dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
//                     // dispatch(authLogin());
//                     Navigation.setRoot(startMainTabs);
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 Alert.alert('Network issues, please retry');
//                 dispatch(uiStopLoading);
//             });

//     };
// };

// export const authLogin = () => {
//     return {
//         type: AUTH_LOGIN,
//     };
// };

// export const authLogout = () => {
//     return {
//         type: AUTH_LOGOUT,
//     };
// };

// export const authSetToken = (token) => {
//     return {
//         type: AUTH_SET_TOKEN,
//         token,
//     };
// };

// export const authStoreToken = (token, expiresIn, refreshToken) => {
//     return dispatch => {
//         return new Promise((resolve, reject) => {
//             const expiredDate = new Date().getTime() + 20 * 1000;
//             const deriveToken = storeObjData('mp:auth:token', { token, expiredDate: expiredDate + '' });
//             const deriveRefreshToken = storeData('mp:auth:refreshToken', refreshToken);

//             if (!deriveToken) {
//                 reject();
//                 return;
//             }
//             else {
//                 dispatch(authSetToken({ token, expiredDate: expiredDate + '' }));
//                 resolve(deriveToken);
//             }
//         });
//     };
// };

// export const authGetToken = () => {
//     return (dispatch, getState) => {
//         return new Promise((resolve, reject) => {
//             const token = getState().auth.token;
//             if (!token.token) {
//                 getObjData('mp:auth:token')
//                     .then(async (parseData) => {
//                         if (parseData) {
//                             const parsedExpiryDate = new Date(parseInt(parseData.expiredDate, 10));
//                             const now = new Date();
//                             if (!parseData.token) {
//                                 reject();
//                                 return;
//                             }
//                             // dispatch(authSetToken(parseData));
//                             // resolve(parseData);
//                             console.log('parsedExpiryDate', parsedExpiryDate,
//                                 'now', now);
//                             if (parsedExpiryDate > now) {
//                                 dispatch(authSetToken(parseData));
//                                 resolve(parseData);
//                                 return;
//                             } else {
//                                 // console.log('first line');
//                                 // return getData('mp:auth:refreshToken')
//                                 //     .then(async (refreshToken) => {
//                                 //         try {
//                                 //             if (refreshToken) {
//                                 //                 const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
//                                 //                     method: 'POST',
//                                 //                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                                 //                     body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
//                                 //                 });
//                                 //                 const res = await response.json();
//                                 //                 if (res.id_token) {
//                                 //                     console.log('refresh token worked ');
//                                 //                     console.log('res.id_token', res.id_token, 'res.expires_in', res.expires_in, 'res.refresh_token', res.refresh_token);
//                                 //                     dispatch(authStoreToken(res.id_token, res.expires_in, res.refresh_token));
//                                 //                     return res.id_token;
//                                 //                 }
//                                 //                 // return res.id_token;
//                                 //                 // return;
//                                 //             }
//                                 //             return;
//                                 //         } catch (error) {
//                                 //             // reject('no token found fetch');
//                                 //             // dispatch(authClearStorage('mp:auth:token'));
//                                 //             console.log('fetach error');
//                                 //         }
//                                 //          return;
//                                 //     })
//                                 //     .catch(err => {
//                                 //         console.log(err);
//                                 //         reject('no token found');
//                                 //         dispatch(authClearStorage('mp:auth:token'));

//                                 //     });

//                                 console.log('first line');
//                                 try {
//                                     const setRefresh = await getData('mp:auth:refreshToken')
//                                     if (setRefresh) {
//                                         const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
//                                             method: 'POST',
//                                             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                                             body: 'grant_type=refresh_token&refresh_token=' + setRefresh,
//                                         });
//                                         const res = await response.json();
//                                         if (res.id_token) {
//                                             console.log('refresh token worked ');
//                                             console.log('res.id_token', res.id_token, 'res.expires_in', res.expires_in, 'res.refresh_token', res.refresh_token);
//                                             dispatch(authStoreToken(res.id_token, res.expires_in, res.refresh_token));

//                                         }
//                                         return res.id_token;
//                                     }
//                                 } catch (error) {
//                                     console.log(error);
//                                     reject('no token found');
//                                     dispatch(authClearStorage('mp:auth:token'));
//                                 }

//                             }
//                         }
//                     }
//                     )
//                 // .catch(error => {
//                 //     reject('unable to fetch error encounter');
//                 // });
//                 // return;
//                 console.log('you reach here');
//                 return;
//             }
//             else {
//                 resolve(token);
//                 return;
//             }
//             // return token;
//         });
//     }
// }

// export const authAutoSignIn = () => {
//     return dispatch => {
//         dispatch(authGetToken())

//             .then(token => {
//                 console.log('is there token ', token);
//                 if (token) {

//                     Navigation.setRoot(startMainTabs);
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 Alert.alert('Failed to fetch token');
//             })
//             ;
//     };
// };

// export const authClearStorage = (key) => {
//     return dispatch => {
//         clearStorage(key);
//     }
// }
