/* eslint-disable prettier/prettier */
const React = require('react');
const Navigation = require('react-native-navigation');
const { View, Text } = require('react-native');


class SideDrawer extends React.Component {

    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'sideMenu',
                    icon: require('../../assets/theater.jpeg'),
                },
            },
        };
    }


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <View>
                <Text>Click the hamburger icon to open the side menu</Text>

                <Text>Click the hamburger icon to open the side menu</Text>
                <Text>Click the hamburger icon to open the side menu</Text>
            </View>
        );
    }

    // navigationButtonPressed({ buttonId }) {
    //     if (buttonId === 'sideMenu') {
    //         Navigation.mergeOptions(this, {
    //             sideMenu: {
    //                 left: {
    //                     visible: true,
    //                 },
    //             },
    //         });
    //     }
    // }
}
SideDrawer.options = {
    topBar: {
        title: {
            text: 'AuthScreen',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'AuthScreen',
    },
};

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'whitesmoke',
//     },
// });
export default SideDrawer;

