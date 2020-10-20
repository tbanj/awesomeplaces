/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { uploadFileToFireBase, getUrl } from '../../lib/storage';
import { sortedData } from '../../lib/extra'
/* eslint-disable prettier/prettier */
import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, ADD_IMAGE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

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
            .catch(err => {
                console.log(err);
                Alert.alert('Something went wrong, please try again');
                dispatch(uiStopLoading());
            })
            .then(res => res.json()).then(parsedRes => {
                console.log('parsedRes', parsedRes);
                dispatch(getPlaces());
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
    return dispatch => {
        fetch('https://majaloc.firebaseio.com/places.json?orderBy="timeStamp"&limitToLast=50&print=pretty')
            .catch(err => {
                Alert.alert('Something went wrong, Hi');
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];

                if ('error' in parsedRes) {
                    // console.log('parsedRes', Object.keys(parsedRes));
                    dispatch(setPlaces(places));
                } else {
                    console.log('parsedRes', parsedRes);

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
                    console.log('descendData', descendData);

                    dispatch(setPlaces(descendData));
                }

            });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places,
    }
};

export const deletePlace = (key) => {
    return dispatch => {
        fetch(`https://majaloc.firebaseio.com/places/${key}.json`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Something went wrong, please try again');
            })
            .then(res => res.json())
            .then(parsedRes => console.log('Delete', parsedRes));
        dispatch({
            type: DELETE_PLACE,
            key: key,
        })
    }

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
