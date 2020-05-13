/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    return (
        /* TouchableWithoutFeedback works with only 1 element, it doesnt work
        with multiple child  or TouchableHighlight */

        <TouchableOpacity onPress={() => props.onItemPressed(props.unit)} >
            <View style={styled.listCss} >
                <Image
                    resizeMode="contain" source={props.placeImage} style={styled.placeImage} />
                <Text>{props.placeName} </Text>
                {/* <Image source={props.reImage} style={styled.reImage} /> */}
            </View>
        </TouchableOpacity>
    );
};

// stick with camelCase naming convention
const styled = StyleSheet.create({
    listCss: {
        width: '100%',
        margin: 5,
        padding: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeImage: { marginRight: 8, height: 30, width: 30 },
    reImage: { marginLeft: 8, height: 30, width: 30 },
});


export default ListItem;
