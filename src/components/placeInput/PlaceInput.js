/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../../src/store/actions/index';
import validate from '../../lib/validation';
import PlaceImage from '../../../src/assets/theater.jpeg';
import ButtonWithBg from '../UI/buttonWithBg/ButtonWithBg';
import DefaultInput from '../UI/defaultInput/DefaultInput';
import DefaultTouchable from '../UI/defaultTouch/DefaultTouchable';
import PickLocation from '../pickLocation/PickLocation';
class PlaceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                placeName: { value: '', touched: false, valid: false, validationRules: { minLength: 3 } },
                location: { value: null, valid: false },
            },
        };
        // this._onLogin = this._onLogin.bind(this)
    }

    placeNameChangeHandler = (key, val) => {

        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val, valid: validate(val, prevState.controls[key].validationRules),
                        touched: true,
                    },
                },
            };
        });
    };
    locationPickHandler = (locate) => {
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    location: { value: locate, valid: true },
                },
            };
        });
    };

    placeSubmitHandler = () => {
        if (this.state.controls.placeName.value.trim() === '') { return; }
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
        this.props.onAddPlace({ placeName: this.state.controls.placeName.value, PlaceImage: PlaceImage }, this.state.controls.location.value);

        this.setState({ controls: { placeName: { value: '', valid: false } } });
        Keyboard.dismiss();
    };

    render() {
        return (
            <View style={styles.container}>
                <PickLocation onLocationPick={this.locationPickHandler} />
                <View style={styles.inputContainer} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <DefaultInput placeholder="An awesome place" onChangeText={(event) => this.placeNameChangeHandler('placeName', event)}
                            value={this.state.controls.placeName.value}
                            touched={this.state.controls.placeName.touched}
                            valid={this.state.controls.placeName.valid}
                        />

                    </TouchableWithoutFeedback>
                    {/* <DefaultTouchable style={styles.loginScreenButton} onPress={() => { this.placeSubmitHandler(); }}
                        underlayColor="#fff" InnerText={'Share a Place'} styleText={styles.loginText} /> */}
                    <ButtonWithBg style={styles.loginScreenButton} color={'#29aaf4'}
                        disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid}
                        onPress={() => { this.placeSubmitHandler(); }}
                        underlayColor="#fff" text={'Share a Place'} styleText={styles.loginText} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: { width: '80%' },
    inputCss: {
        width: '80%',
    },
    inputContainer: {
        width: '100%',

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
        onAddPlace: (name, location) => dispatch(addPlace(name, location)),
        onDeletePlace: (key) => dispatch(deletePlace(key)),
        onSelectedPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: (name) => dispatch(addPlace(name)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);