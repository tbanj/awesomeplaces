/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
const FancyButton = React.forwardRef((props, ref) => (
  // <button ref={ref} className="FancyButton">
  //   {props.children}
  // </button>
  <TextInput underlineColorAndroid="transparent" {...props} returnKeyType={props.handleReturnType}
    blurOnSubmit={props.handleBlur} onSubmitEditing={props.handleFocus} ref={ref}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} />
));




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

export default FancyButton;
