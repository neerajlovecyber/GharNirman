import { Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../Components/FormField';
import CustomButton from '../../Components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../services/authContext'; 
import { showMessage } from 'react-native-flash-message';
import GoogleSignInButton from '../../Components/GoogleSignInButton';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Use router for navigation
  const { signup, loginWithGoogle } = useAuth(); // Get signup function from auth context

  const handleSignUp = async () => {
    console.log(form);
    if (!form.email || !form.password || !form.username) {
      showMessage({
        message: "Error",
        description: "Please fill in all fields",
        type: "danger",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(form.email, form.password);
      console.log("Success", "Account created successfully");
      router.push('/signin'); 
      setForm("");
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Please fill all the details correctly.",
        type: "danger",
      });
      setForm("");
      return;
     
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Handle navigation or state update after successful Google sign-in
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      // Handle error display or recovery logic
    }
  };

  const handlePress = () => {
    if (!isSubmitting) {
      handleSignUp();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[82vh] justify-center px-4 my-6 items-center">
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[180px]'
          />
          <Text className="text-2xl text-white text-semibold mb-5 mt-5 text-center font-psemibold">Sign Up</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            
          />
          <CustomButton
            title='Sign up'
            containerStyle={styles.buttonStyle} // Corrected prop name
            isLoading={isSubmitting}
            onPress={handlePress} // Simplified onPress
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-md text-gray-100 font-pregular'>Already have an account?</Text>
            <Link href='/signin' className='text-md font-psemibold text-secondary'>Login</Link>
          </View>
          <Text className="text-white mt-5"> or</Text>
          <GoogleSignInButton onPress={handleGoogleSignIn} />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
  }
});
