/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';
import ListItem from '../listItem/ListItem';
const PlaceList = (props) => {
    // console.warn() only work with browser to see this visit http://localhost:8081/debugger-ui/
    return (
        <FlatList
            data={props.places}
            renderItem={(info, index) => {

                return <ListItem
                    placeName={info.item.name}
                    placeImage={info.item.image}
                    reImage={info.remoteImage}
                    unit={info.item.key}
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />;
            }}
        />
    );
};

export default PlaceList;
