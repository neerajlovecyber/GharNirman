import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, onPress, containerStyle, textStyle, isLoading }) => {
  console.log('CustomButton Rendered');

  return (
    <TouchableOpacity
      style={[styles.buttonStyle, containerStyle, isLoading && styles.disabledButton]}
      onPress={onPress} 
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF8F00',
    borderRadius: 10,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;
