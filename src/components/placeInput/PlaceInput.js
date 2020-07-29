/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../../src/store/actions/index';
import PlaceImage from '../../../src/assets/theater.jpeg';
import DefaultInput from '../UI/defaultInput/DefaultInput';
import DefaultTouchable from '../UI/defaultTouch/DefaultTouchable';
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
                <DefaultInput style={styles.inputCss} placeholder="An awesome place" onChangeText={this.placeNameChangeHandler}
                    value={this.state.placeName} />
                {/* <Button style={styles.placeButton} title="Share a Place" onPress={this.placeSubmitHandler} /> */}
                <DefaultTouchable style={styles.loginScreenButton} onPress={() => {
                    alert('how are u');
                    this.placeSubmitHandler();
                }}
                    underlayColor="#fff" InnerText={'Share a Place'} styleText={styles.loginText} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputCss: {
        width: '100%',
    },
    inputContainer: {
        width: '80%',
        // flex: 1,
        // padding: 10,
        // width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    // placeButton: {
    //     borderColor: 'red',
    //     borderWidth: 1,
    // },

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