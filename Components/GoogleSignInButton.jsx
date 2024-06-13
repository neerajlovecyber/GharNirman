import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { icons } from '../constants';
const GoogleSignInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} className="mt-5 w-full text-center justify-center h-12" onPress={onPress}>
      <Image
        source={icons.google}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    color:"#000",
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
  },
});

export default GoogleSignInButton;
