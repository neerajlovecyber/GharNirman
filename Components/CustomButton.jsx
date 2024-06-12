import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  console.log('Button Rendered'); 
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#FF8F00',
        borderRadius: 10,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoading ? 0.5 : 1,
        ...containerStyles, 
      }}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text style={{ color: "#000", fontWeight: '500',  fontSize: 18, ...textStyles }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
