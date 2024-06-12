import React from 'react';
import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router'; // Correctly import Tabs and other components
import { icons } from '../../constants'; // Ensure icons are correctly imported

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }} // Adjust width, height, and tintColor
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular' } text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle:{
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 60
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home} // Correct the icon reference
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile} // Correct the icon reference
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
