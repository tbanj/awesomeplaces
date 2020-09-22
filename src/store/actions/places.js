/* eslint-disable prettier/prettier */
import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        location: location,
        image: image,
    };
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
