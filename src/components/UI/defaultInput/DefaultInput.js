/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = (props) => {



    /* (1)  to override default style of a child comp. , styles will be setup in the
     parent or top level component and the style={styles.input} will be called after
     {...props}  e.g
     <TextInput style={styles.input} underlineColorAndroid="transparent" {...props} />);
     ..
     2) To make default style override the parent component , {..props} will be called after
     style={styles.input}
      <TextInput {...props} style={styles.input} underlineColorAndroid="transparent"  />);
      ..
      3) To merge more than 1 styles together you make use of array & they will override each
      other base on there order of list
      <TextInput {...props}  underlineColorAndroid="transparent"
       style={[styles.input, props.style]}  />);
     */
    const styles = StyleSheet.create({
        input: {
            // width: 300,
            // always use relative values
            width: '100%',
            borderWidth: 1,
            borderColor: '#eee',
            padding: 5,
            marginTop: 8,
            marginBottom: 8,
        },
        invalid: {
            backgroundColor: '#f9c0c0',
            borderColor: 'red',
        },
    });

    return (
        <TextInput underlineColorAndroid="transparent" {...props}
            returnKeyType={props.handleReturnType}
            onSubmitEditing={props.onKeyDismiss}
            blurOnSubmit={props.handleBlur}
            style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} />);
};


export default DefaultInput;
