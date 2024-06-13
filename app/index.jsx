import {  Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {   Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images} from "../constants"
import CustomButton from '../Components/CustomButton';
export default function App() {
  return (

    <SafeAreaView className="bg-primary h-full">
     <ScrollView contentContainerStyle={{height: '100%'}}>
       <View className="w-full justify-center min-h-[85vh] items-center px-4">
        <Image 
        source={images.logo}
        className="w-[130px] h-[84px]"
        resizeMode = "contain"
        />
         <Image 
        source={images.cards}
        className="w-[470px] h-[340px]"
        resizeMode = "contain"
        />
        <View className="relative mt-12">
          <Text className="text-2xl text-white font-bold text-center">Build your dream home with{' '}
              <Text className="text-secondary-200 text-center" >Ghar Nirmaan!</Text>
              {/* <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-8 -right-24" resizeMode = "contain"/> */}
          </Text>
  
        </View>
        <Text className='text-sm font-pregular text-green-100 mt-7 text-center'>
        Where creativity meets innovatin: embark on a journey of limitless exploration with ghar nirmaan
       </Text>
       <CustomButton title="Continue with email" 
       onPress = {()=> router.push('signin')}
       containerStyle={styles.buttonContainer} 
       />
     
       </View>
      
     </ScrollView>
     <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',              
    marginTop: 30,             
  },
});