/* eslint-disable prettier/prettier */
import React, { forwardRef } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
// const DefaultTouchable = (props) => (

//     <TouchableOpacity  {...props}
//         style={[styles.loginScreenButton, props.style]} onPress={props.onPress}
//         underlayColor="#fff">
//         <Text style={[styles.ButtonText, props.styleText]}>{props.InnerText} </Text>
//     </TouchableOpacity>
// );

const DefaultTouchable = forwardRef((props, ref) => (
    <TouchableOpacity  {...props} ref={ref}
        style={[styles.loginScreenButton, props.style]} onPress={props.onPress}
        underlayColor="#fff">
        <Text style={[styles.ButtonText, props.styleText]}>{props.InnerText} </Text>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    ParentButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
    },
    ButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
});
export default DefaultTouchable;
