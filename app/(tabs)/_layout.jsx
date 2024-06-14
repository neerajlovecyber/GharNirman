import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router'; // Correctly import Tabs and other components
import { icons } from '../../constants'; // Ensure icons are correctly imported

const TabIcon = ({ icon, color, name, focused, customStyle }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[{ width: 20, height: 20, tintColor: color }, customStyle]} // Adjust width, height, and tintColor
      />
      {name ? (
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
          {name}
        </Text>
      ) : null}
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
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 60,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
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
          ),
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark} // Correct the icon reference
              color={color}
              name="History"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: 'Add',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.addTab}>
              <TabIcon
                icon={icons.plus} // Correct the icon reference
                color={color}
                name="Add"
                focused={focused}
                customStyle={styles.addIcon} // Apply custom style to the add icon
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search} // Correct the icon reference
              color={color}
              name="Dashboard"
              focused={focused}
            />
          ),
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
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#161622',
    borderTopWidth: 1,
    borderTopColor: '#232533',
    height: 60,
    flexDirection: 'row',
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTab: {
    marginTop: -58, // Adjust the value to move the "Add" tab up
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 55, // Adjust the width
    height: 55, // Adjust the height
    backgroundColor: '#161622', // Add a background color for better visibility
  },
  addIcon: {
    width: 46,
    height: 46,
    color:'#161622',
    marginRight:1,
    marginTop:15
  },
});

export default TabsLayout;
