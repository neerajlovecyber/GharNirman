import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router'; // Ensure correct import from expo-router
import { icons } from '../../constants'; // Adjust the path to your icons

const TabIcon = ({ icon, color, name, focused, customStyle }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }, customStyle]} // Adjust width, height, and tintColor
      />
      {name ? (
        <Text style={[styles.label, { color: color }]}>{name}</Text>
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
              icon={icons.home} // Replace with the correct icon reference
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
              icon={icons.bookmark} // Replace with the correct icon reference
              color={color}
              name="History"
              focused={focused}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='add'
        options={{
          title: 'Add',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.addTab}>
              <TabIcon
                icon={icons.plus} // Replace with the correct icon reference
                color={color}
                name="Add"
                focused={focused}
                customStyle={styles.addIcon} // Apply custom style to the add icon
              />
            </View>
          ),
        }}
      /> */}
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search} // Replace with the correct icon reference
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
              icon={icons.profile} // Replace with the correct icon reference
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
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 1,
  },
  addTab: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    backgroundColor: '#161622',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default TabsLayout;
