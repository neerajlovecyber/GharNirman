import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import icons from '../constants/icons'; // Assuming this is the correct path to your icons

// Sample JSON data
const jsonData = [
  {
    "id": 1,
    "category": "bricks",
    "total_price": 1200.50,
    "paid": 900.00,
    "icon": "🔨",
    "color": "#FF5733"
  },
  {
    "id": 2,
    "category": "cement",
    "total_price": 1500.00,
    "paid": 1500.00,
    "icon": "🏗️",
    "color": "#33FF57"
  },
  {
    "id": 3,
    "category": "tiles",
    "total_price": 800.75,
    "paid": 600.00,
    "icon": "🧱",
    "color": "#3357FF"
  },
  {
    "id": 4,
    "category": "wood",
    "total_price": 2500.00,
    "paid": 2300.00,
    "icon": "🪵",
    "color": "#FF33A1"
  },
  {
    "id": 5,
    "category": "paints",
    "total_price": 1000.00,
    "paid": 800.00,
    "icon": "🎨",
    "color": "#FF9F33"
  },
  {
    "id": 6,
    "category": "steel",
    "total_price": 3000.00,
    "paid": 2500.00,
    "icon": "⚙️",
    "color": "#33FFF2"
  },
  {
    "id": 7,
    "category": "glass",
    "total_price": 750.00,
    "paid": 500.00,
    "icon": "🪟",
    "color": "#9D33FF"
  },
  {
    "id": 8,
    "category": "plumbing",
    "total_price": 1200.00,
    "paid": 1000.00,
    "icon": "🚰",
    "color": "#F2FF33"
  },
  {
    "id": 9,
    "category": "electric",
    "total_price": 1800.00,
    "paid": 1400.00,
    "icon": "🔌",
    "color": "#FF33F2"
  },
  {
    "id": 10,
    "category": "sand",
    "total_price": 500.00,
    "paid": 300.00,
    "icon": "🏖️",
    "color": "#33FFA8"
  }
];

// Function to capitalize the first letter of the category
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CardComponent() {
  const handlePress = (id) => {
    // Handle button press here, for now just logging the id
    console.log(`Add button pressed for item id: ${id}`);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]} className='flex-row items-center justify-between bg-white-200 h-12'>
      <View className='w-1/2 flex-row justify-between text-center items-center'>
        <Text style={styles.icon} className=''>{item.icon}</Text>
        <Text style={styles.text} className='text-gray-900 font-psemibold'>
          {capitalizeFirstLetter(item.category)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handlePress(item.id)}
      >
        <Image 
          source={icons.plus}  
          resizeMode='contain'
          style={styles.iconImage} 
          className='w-[115px] h-[35px]' 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={jsonData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  card: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 3,  // Adds a shadow for better visual distinction
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  }
});
