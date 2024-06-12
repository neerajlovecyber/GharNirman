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
       <View className="w-full items-center h-full px-4">
        <Image 
        source={images.logo}
        className="w-[130px] h-[84px]"
        resizeMode = "contain"
        />
         <Image 
        source={images.cards}
        className="w-[380px] h-[300px]"
        resizeMode = "contain"
        />
        <View className="relative mt-12">
          <Text className="text-2xl text-white font-bold text-center">Build your dream home with{' '}
              <Text className="text-secondary-200">Ghar Nirmaan</Text>
              <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-8 -right-24" resizeMode = "contain"
              />
          </Text>
  
        </View>
        <Text className='text-sm font-pregular text-green-100 mt-7 text-center'>
        Where creativity meets innovatin: embark on a journey of limitless exploration with ghar nirmaan
       </Text>
       <CustomButton title="Continue with email" 
       handlePress = {()=> router.push('home')}
       containerStyles={styles.buttonContainer} 
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