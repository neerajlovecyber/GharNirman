import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../Components/FormField';
import CustomButton from '../../Components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
  const[form, setForm] = useState({
    username:'',
    email: '',
    password: '',
  })
  const[isSubmitting, setIsSubmitting] = useState(false);
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full  min-h-[82vh] justify-center px-4 my-6 items-center">
         <Image
           source={images.logo}
           resizeMode='contain' className='w-[115px] [h-35px] '
         />
         <Text className="text-2xl text-white text-semibold mb-5 text-center font-psemibold">Sign In</Text>
         <FormField
            title = "Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyle = "mt-7"
         />
         <FormField
            title = "Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyle = "mt-7"
            keyboardType = "email-address"
         />
         <FormField
            title = "Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyle = "mt-7"
         />
         <CustomButton title='Sign up'  containerStyles={styles.buttonStyle} isLoading={isSubmitting}/>
         <View className='justify-center pt-5 flex-row gap-2'>
        <Text className='text-md text-gray-100 font-pregular'>Already have an account?</Text>
        <Link href='/signin' className='text-md font-psemibold text-secondary'>Login</Link> 

       </View>
      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  buttonStyle:{
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
  }
})