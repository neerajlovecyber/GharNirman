import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { images } from '../../constants'; // Adjust the path to your icons
import CustomButton from '../../Components/CustomButton';
import { useAuth } from '../../services/authContext';
import {  router } from 'expo-router';

const Profile = () => {
  const currentUser = useAuth();
  const userId = currentUser.currentUser?.uid;
  const displayName = currentUser.currentUser?.displayName ? currentUser.currentUser.displayName.slice(0, 20) : '';
  const displayEmail = currentUser.currentUser?.email ? currentUser.currentUser.email.slice(0, 20) : '';

  const handleLogout = () => {
   
   router.push('/signin'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText} className='text-secondary-200 font-psemibold'>Your Profile</Text>
        </View>
        {images.profile ? (
          <Image
            style={styles.profileImage}
            source={images.profile}
            resizeMode='contain'
          />
        ) : (
          <Text>No Profile Image</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoS}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info} className='font-psemibold'>{displayName}</Text>
        </View>
        <View style={styles.infoS}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info} className='font-psemibold'>{displayEmail}</Text>
        </View>
        <View style={styles.infoS}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.info} className='font-psemibold'>********</Text>
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <CustomButton
          title='Log Out'
          containerStyle={styles.buttonStyle}
          onPress={handleLogout} // Call handleLogout function on press
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensure you have a background color to cover the screen
  },
  profileContainer: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    fontSize:24
  },
  
  profileImage: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    marginTop: 10,
  },
  infoContainer: {
    width: '100%',
    marginTop: 20,
    padding: 20,
  },
  infoS: {
    borderBottomWidth: 2,
    borderColor: '#161622',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  buttonStyle: {
    width: '60%',
    borderRadius: 15,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    width: '100%',
  },
});

export default Profile;
