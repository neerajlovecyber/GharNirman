import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  console.log('Button Rendered'); // Debugging line to ensure component is rendering

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'red', // Temporarily set to a visible color for debugging
        borderRadius: 10,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoading ? 0.5 : 1,
        ...containerStyles, // Ensure additional styles are merged correctly
      }}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text style={{ color: '#fff', fontWeight: '500', fontSize: 18, ...textStyles }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
