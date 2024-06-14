import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
            <Image style={styles.eyeImg} source={!showPassword? icons.eye : icons.eyeHide} resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, // Equivalent to space-y-2
    marginTop: 10,    // Equivalent to mt-7
  },
  title: {
    fontSize: 16, // Equivalent to text-base
    color: '#FFFFFF', // Equivalent to text-white-100
    fontWeight: '500', // Equivalent to font-pmedium
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#444444', // Equivalent to border-black-200
    width: '100%',
    height: 50, // Equivalent to h-16
    paddingHorizontal: 16, // Equivalent to px-4
    backgroundColor: '#222222', // Equivalent to bg-black-100
    borderRadius: 15, // Equivalent to rounded-2xl
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF', // Equivalent to text-white
    fontWeight: '600', // Equivalent to font-psemibold
    fontSize: 16, // Equivalent to text-base
  },
  toggleButton: {
    padding: 8,
  },
  eyeImg: {
    width: 24,
    height: 24 // Equivalent to secondary color
  },
});

export default FormField;
