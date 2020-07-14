/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, StatusBar, Button, PickerIOSComponent } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../../src/store/actions/index';
import PlaceImage from '../../../src/assets/theater.jpeg';
class PlaceInput extends Component {
    constructor(props) {
        super(props);
        this.state = { placeName: '' };
    }

    placeNameChangeHandler = (event) => { this.setState({ placeName: event }); };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }
        //  in react-native to view debug make use of alert to display content u want to troubleshoot
        // setPlaces([
        //   ...places,
        //   {
        //     key: new Date().getTime() + '', name: placeName,
        //     image: PlaceImage, remoteImage: {
        //       uri: 'http://4.bp.blogspot.com/-TLR8ISV2qWo/TyUeVqg9xmI/AAAAAAAACOU/1rCZw9-uj50/s640/62589635.jpg',
        //       width: 30, height: 30,
        //     },
        //   },
        // ]);
        this.props.onAddPlace({ placeName: this.state.placeName, PlaceImage: PlaceImage });
        this.setState({ placeName: '' });
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputCss} placeholder="An awesome place" onChangeText={this.placeNameChangeHandler} value={this.state.placeName}
                />
                <Button style={styles.placeButton} title="Add" onPress={this.placeSubmitHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputCss: {
        width: '70%',
    },
    inputContainer: {
        // flex: 1,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: (key) => dispatch(deletePlace(key)),
        onSelectedPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: (name) => dispatch(addPlace(name)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);