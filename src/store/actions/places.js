/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { uploadFileToFireBase } from '../../lib/storage';
import { sortedData } from '../../lib/extra';
/* eslint-disable prettier/prettier */
import { AUTH_SET_TOKEN, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, SET_PLACES } from './actionTypes';
import { authSetToken } from './auth';
import { uiStartLoading, uiStopLoading } from './ui';
import { getData, getObjData } from '../../lib/asyncStorage';

// export const addPlace = (placeName, location, image) => {
//     return {
//         type: ADD_PLACE,
//         placeName: placeName,
//         location: location,
//         image: image,
//     };
// };

// https://majaloc.firebaseio.com/
/* JSON.stringify() ..is use to convert javascript object to object that can be store on server
    JSON.parse()   is use to convert server object to javascript object*/

export const addPlace = (placeName, location, image) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());
        const imgUrl = await Promise.resolve(uploadFileToFireBase(image.totalData));
        delete image.totalData;
        const placeData = {
            name: placeName.placeName,
            location: location,
            image: imgUrl,
            timeStamp: Date.now(),
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        };

        fetch('https://majaloc.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData),
        })
            .then(res => res.json()).then(parsedRes => {
                dispatch(getPlaces());
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Something went wrong, please try again');
                dispatch(uiStopLoading());
            });

        // dispatch({
        //     type: ADD_PLACE,
        //     placeName: placeName,
        //     location: location,
        //     image: image,
        // });
    };
};
// export const addPlace = (placeName, location, image) => {

//     return dispatch => {
//         const placeData = {
//             name: placeName.placeName,
//             location: location,
//         };

//         Promise.resolve(uploadFileToFireBase(image.totalData));
//         test of firebase console
//         fetch('https://us-central1-majaloc.cloudfunctions.net/majaPlace', {
//             method: 'POST',
//             body: JSON.stringify({ name: 'Alabi Temitope Wahab' }),
//         })
//             .catch(err => console.log(err))
//             .then(res => {
//                 if (res) {
//                     // console.log('res', res);
//                     return res.json();
//                 }
//             })
//             .then(parsedRes => console.log('parsedRes', parsedRes));

//         for image upload
//         fetch('https://us-central1-majaloc.cloudfunctions.net/storeImage', {
//             method: 'POST',
//             body: JSON.stringify({
//                 image: image.base64,
//             }),

//         })
//             .catch(err => console.log(err))
//             .then(res => {
//                 if (res) {
//                     // console.log('res', res);
//                     return res.json();
//                 }
//             })
//             .then(parsedRes => console.log('parsedRes', parsedRes));
// fetch('https://majaloc.firebaseio.com/places.json', {
//     method: 'POST',
//     body: JSON.stringify(placeData),
// })
//     .catch(err => console.log(err))
//     .then(res => res.json()).then(parsedRes => {
//         console.log(parsedRes);

//     });
//     };
// };


export const getPlaces = () => {
    return async (dispatch, getState) => {
        // to get data store in state use getState
        let token = null;
        const getToken = getState().auth.token;
        if (!getToken.token) {
            token = await Promise.resolve(getObjData('mp:auth:token'));
            if (token.token) {
                console.log('you are here');
                dispatch({
                    type: AUTH_SET_TOKEN,
                    token: token,
                });
            }
            else {
                console.log('dont come here');
                Alert.alert('No valid token found, will redirect you to Login');
                return;
            }
        }
        if (getToken.token) {
            token = getToken;
        }

        // console.log('get token', token);
        // if (!token.token) {
        //     Alert.alert('No valid token found, will redirect you to Login');
        //     // setTimeout(() => {
        //     //     Navigation.setRoot({
        //     //         root: { component: { name: 'AuthScreen' } },
        //     //     });
        //     // }, 3000);
        //     return;
        // }
        // dispatch(authSetToken(token));
        fetch(`https://majaloc.firebaseio.com/places.json?&auth=${token.token}&orderBy="timeStamp"&limitToLast=50&print=pretty`)
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];

                if ('error' in parsedRes) {
                    dispatch(setPlaces(places));
                } else {

                    for (let key in parsedRes) {
                        places.push({
                            ...parsedRes[key],
                            image: {
                                uri: parsedRes[key].image,
                                flex: 1,
                            },
                            key: key,
                        });
                    }
                    const descendData = sortedData(places);
                    dispatch(setPlaces(descendData));
                }

            })
            .catch(err => {
                Alert.alert('Something went wrong, Hi');
                console.log(err);
            });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places,
    };
};

export const deletePlace = (key) => {
    return async (dispatch) => {
        dispatch(uiStartLoading);
        const token = await Promise.resolve(getObjData('mp:auth:token'));
        if (!token.token) {
            Alert.alert('No valid token found');
            return;
        }
        fetch(`https://majaloc.firebaseio.com/places/${key}.json&auth=${token.token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading);
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Something went wrong, please try again');

                dispatch(uiStopLoading);
            });
        dispatch({
            type: DELETE_PLACE,
            key: key,
        });
    };

};


export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        placeName: key,
    };
};

export const deselectPlace = (key) => {
    return {
        type: DESELECT_PLACE,
        placeName: key,
    };
};
