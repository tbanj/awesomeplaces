/* eslint-disable prettier/prettier */
// reducers is just a function

import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from '../actions/actionTypes';
const initialState = {
    places: [],
    selectedPlace: null,
};
const reducer = (state = initialState, action) => {
    // if (action.placeName !== undefined) {
    //     alert(action.placeName.PlaceImage);
    // }
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: [...state.places, {
                    key: new Date().getTime() + '', name: action.placeName.placeName,
                    image: action.placeName.PlaceImage, remoteImage: {
                        uri: 'http://4.bp.blogspot.com/-TLR8ISV2qWo/TyUeVqg9xmI/AAAAAAAACOU/1rCZw9-uj50/s640/62589635.jpg',
                        width: 30, height: 30,
                    },
                }],
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((plac, ind) => plac.key !== action.placeName),
                // setPlaces(removeText),
                // setModalVisible(false);
            };

        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => { return place.key === action.placeName; }),
                // setPlaces(removeText),
                // setModalVisible(false);
            };
        default:
            return state;
    }

};

export default reducer;
