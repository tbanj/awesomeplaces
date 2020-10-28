/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { authGreetingState, authLogout } from '../../store/actions/auth';
// import { authLogout } from '../../store/actions/index';
// import startMainTabs from '../maintabs/startMainTabs';
// import SettingScreen from './maintabs/Setting';
class MenuScreen extends Component {
    constructor(props) {

        super(props);
    }

    loginHandler = () => {
        //  initialiaze next screen
        // startMainTabs();
    }

    render() {
        return (

            <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
                <TouchableOpacity onPress={async () => {
                    await this.props.onLogout();
                }}>
                    <View style={styles.drawItem}>
                        <Icon style={styles.drawItemIcon} name={'logout'} size={30} color="#aaa" />
                        <Text>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

MenuScreen.options = {
    // topBar: {
    //     title: {
    //         text: 'MENU_SCREEN',
    //         color: 'white',
    //     },
    //     background: {
    //         color: '#4d089a',
    //     },
    // },
    // bottomTab: {
    //     text: 'MENU_SCREEN',
    // },
    sideMenu: {
        left: {
            visible: false,
            enabled: false,
        },
    },
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    drawItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
    },
    drawItemIcon: { marginRight: 10 },
    container: {
        paddingTop: 50, backgroundColor: 'white',
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        places: state.places.places,
        greetingState: state.auth.greetingState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => { dispatch(authLogout()); },
        onGreeting: () => dispatch(authGreetingState()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
