import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { images } from '../../constants'; // Adjust the path to your icons
import CustomButton from '../../Components/CustomButton';

const Profile = () => {
  const handlePress = () => {
   
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText} className='text-secondary-200 font-pbold mb-4'>Your Profile</Text>
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
        <Text style={styles.label} className='font-pregular'>Username:</Text>
        <Text style={styles.info} className='font-psemibold'>JohnDoe</Text>
        </View> 
        <View style={styles.infoS}>
        <Text style={styles.label} className='font-pregular'>Email:</Text>
        <Text style={styles.info} className='font-psemibold'>john.doe@example.com</Text>
        </View>
        <View style={styles.infoS}>
        <Text style={styles.label} className='font-pregular'>Password:</Text>
        <Text style={styles.info} className='font-psemibold'>********</Text> 
        </View>
      </View>
      <View style={styles.logoutContainer}>
      <CustomButton
            title='Log Out'
            containerStyle={styles.buttonStyle} // Corrected prop name
            onPress={handlePress} // Simplified onPress
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    height: '30%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#161622'
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
   
  },

  profileImage: {
    width: 80,
    height: 80,
    borderWidth:2,
    borderColor:'#fff',
    borderRadius: 50,
    marginTop:10
  },
  infoContainer: {
    width:'100%',
    marginTop: 20,
    padding:20,
  },
  infoS:{
     borderBottomWidth:2,
     borderColor:'#161622',
     marginBottom:20,
  },
  label: {
    fontSize: 16,
    color:'gray',
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
    alignItems:'center',
    width: '100%',

  },
  logoutButton:{
    width:'100',
    height:'40',
  }
});

export default Profile;
