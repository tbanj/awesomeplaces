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
    return dispatch => {
        const placeData = {
            name: placeName.placeName,
            location: location,
        };
        fetch('https://majaloc.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData),
        })
            .catch(err => console.log(err))
            .then(res => res.json()).then(parsedRes => {
                console.log(parsedRes);
                // return {
                //     type: ADD_PLACE,
                //     placeName: placeName,
                //     location: location,
                //     image: image
                // };
            });
    }
};


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
