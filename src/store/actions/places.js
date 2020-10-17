/* eslint-disable prettier/prettier */
import { uploadFileToFireBase, getUrl } from '../../lib/storage';
/* eslint-disable prettier/prettier */
import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, ADD_IMAGE } from './actionTypes';

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
        const imgUrl = await Promise.resolve(uploadFileToFireBase(image.totalData));
        delete image.totalData;
        const placeData = {
            name: placeName.placeName,
            location: location,
            image: imgUrl,
        };
        fetch('https://majaloc.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData),
        })
            .catch(err => console.log(err))
            .then(res => res.json()).then(parsedRes => {
                console.log('parsedRes', parsedRes);

            });
        dispatch({
            type: ADD_PLACE,
            placeName: placeName,
            location: location,
            image: image,
        });
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


export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        key: key,
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
