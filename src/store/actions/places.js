/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { deleteFile, uploadFileToFireBase } from '../../lib/storage';
import { sortedData } from '../../lib/extra';
/* eslint-disable prettier/prettier */
import { AUTH_SET_TOKEN, DELETE_PLACE, DESELECT_PLACE, PLACE_ADDED, SELECT_PLACE, SET_PLACES, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { getObjData } from '../../lib/asyncStorage';
import { Navigation } from 'react-native-navigation';


// https://majaloc.firebaseio.com/
/* JSON.stringify() ..is use to convert javascript object to object that can be store on server
    JSON.parse()   is use to convert server object to javascript object*/

export const addPlace = (placeName, location, image) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            dispatch(uiStartLoading());
            const imgUrl = await Promise.resolve(uploadFileToFireBase(image.totalData));
            delete image.totalData;
            const placeData = {
                name: placeName.placeName,
                location: location,
                image: imgUrl.url,
                timeStamp: Date.now(),
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
                fileName: imgUrl.fileNm,
            };

            fetch(`https://majaloc.firebaseio.com/places.json?auth=${token.token}`, {
                method: 'POST',
                body: JSON.stringify(placeData),
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else { throw new Error('network error'); }
                }).then(parsedRes => {
                    dispatch(getPlaces());
                    dispatch(uiStopLoading());
                    // Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
                    //     bottomTabs: {
                    //       currentTabIndex: 0
                    //     }
                    //   });
                    dispatch(placeAdded());
                    let checkAddState = getState().places.placeAdded;
                    if (checkAddState) {
                        dispatch(startAddPlace());
                        Navigation.mergeOptions('BOTTOM_TABS_MAJAPLACE', {
                            bottomTabs: {
                                currentTabIndex: 0,
                            },
                        });

                    }

                })
                .catch(err => {
                    console.log(err);
                    Alert.alert('Something went wrong, please try again');
                    dispatch(uiStopLoading());
                });

        } catch (error) {
            console.log('network error');
        }
    };
};


export const getPlaces = () => {
    return async (dispatch, getState) => {
        try {
            // to get data store in state use getState
            let token = null;
            const getToken = getState().auth.token;
            if (getToken.token === null || new Date(parseInt(getToken.expiredDate, 10)) <= new Date()) {
                token = await Promise.resolve(getObjData('mp:auth:token'));
                if (token.token) {
                    dispatch({
                        type: AUTH_SET_TOKEN,
                        token: token,
                    });
                }
                else {
                    Alert.alert('No valid token found, will redirect you to Login');
                    return;
                }
            }
            if (getToken.token) {
                token = getToken;
            }

            fetch(`https://majaloc.firebaseio.com/places.json?&auth=${token.token}&orderBy="timeStamp"&limitToLast=50&print=pretty`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else { throw new Error('network error'); }
                })
                .then(parsedRes => {
                    const places = [];
                    if (parsedRes === null) { dispatch(setPlaces(places)); return; }
                    if ('error' in parsedRes) {
                        dispatch(setPlaces(places));
                        return;
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
                    // Alert.alert('Something went wrong, try again');
                    console.log(err);
                });
        } catch (error) {
            console.log('no token found');
        }
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places,
    };
};

export const deletePlace = (key, fileName) => {
    return async (dispatch) => {
        dispatch(uiStartLoading);
        const token = await Promise.resolve(getObjData('mp:auth:token'));
        if (!token.token) {
            Alert.alert('No valid token found');
            return;
        }
        fetch(`https://majaloc.firebaseio.com/places/${key}.json?auth=${token.token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else { throw new Error('network error'); }
            })
            .then(async (parsedRes) => {

                try {
                    await Promise.resolve(deleteFile(fileName));
                    dispatch(uiStopLoading);
                } catch (error) {
                }
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

export const placeAdded = () => {
    return {
        type: PLACE_ADDED,
    };
};

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE,
    };
};



