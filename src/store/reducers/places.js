/* eslint-disable prettier/prettier */
// reducers is just a function

import { ADD_PLACE, DELETE_PLACE, PLACE_ADDED, SELECT_PLACE, SET_PLACES, START_ADD_PLACE } from '../actions/actionTypes';
const initialState = {
    places: [],
    selectedPlace: null,
    placeAdded: false,
};
const reducer = (state = initialState, action) => {
    // if (action.placeName !== undefined) {
    //     alert(action.placeName.PlaceImage);
    // }

    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places,
            };
        case ADD_PLACE:
            return {
                ...state,
                places: [...state.places, {
                    key: new Date().getTime() + '', name: action.placeName.placeName,
                    location: action.location,
                    image: {
                        uri: action.image.uri,
                        flex: 1,
                    },
                    fileName: action.image.fileName,
                }],
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((plac, ind) => plac.key !== action.key),
            };
        case START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false,
            };
        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true,
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => { return place.key === action.placeName; }),
            };
        default:
            return state;
    }

};

export default reducer;
