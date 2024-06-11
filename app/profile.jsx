import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View>
      <Text>How are you!</Text>
    </View>
  )
}

export default profile


const styles = StyleSheet.create({
  profile:{
   display: 'flex',
   flex: 1,
   alignItems: 'center',
   justifyContent: "center"
  }
})