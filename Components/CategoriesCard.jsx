import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import icons from '../constants/icons'; // Assuming this is the correct path to your icons
import CategoryDetailsModal from './CategoryDetailsModal'; // Import the new component

// Sample JSON data
const jsonData = [
  {
    "id": 1,
    "category": "bricks",
    "total_price": 1200.50,
    "paid": 900.00,
    "icon": "🔨",
    "color": "#FF5733",
    "transactions": [
      { "date": "2023-06-01", "amount": 300.00 },
      { "date": "2023-06-15", "amount": 600.00 }
    ]
  },
  {
    "id": 2,
    "category": "cement",
    "total_price": 1500.00,
    "paid": 1500.00,
    "icon": "🏗️",
    "color": "#33FF57",
    "transactions": [
      { "date": "2023-05-01", "amount": 1500.00 }
    ]
  },
  {
    "id": 3,
    "category": "tiles",
    "total_price": 800.75,
    "paid": 600.00,
    "icon": "🧱",
    "color": "#3357FF",
    "transactions": [
      { "date": "2023-04-01", "amount": 300.00 },
      { "date": "2023-04-15", "amount": 300.00 }
    ]
  },
  {
    "id": 4,
    "category": "wood",
    "total_price": 2500.00,
    "paid": 2300.00,
    "icon": "🪵",
    "color": "#FF33A1",
    "transactions": [
      { "date": "2023-03-01", "amount": 1000.00 },
      { "date": "2023-03-15", "amount": 1300.00 }
    ]
  },
  {
    "id": 5,
    "category": "paints",
    "total_price": 1000.00,
    "paid": 800.00,
    "icon": "🎨",
    "color": "#FF9F33",
    "transactions": [
      { "date": "2023-02-01", "amount": 800.00 }
    ]
  },
  {
    "id": 6,
    "category": "steel",
    "total_price": 3000.00,
    "paid": 2500.00,
    "icon": "⚙️",
    "color": "#33FFF2",
    "transactions": [
      { "date": "2023-01-01", "amount": 1500.00 },
      { "date": "2023-01-15", "amount": 1000.00 }
    ]
  },
  {
    "id": 7,
    "category": "glass",
    "total_price": 750.00,
    "paid": 500.00,
    "icon": "🪟",
    "color": "#9D33FF",
    "transactions": [
      { "date": "2023-05-01", "amount": 500.00 }
    ]
  },
  {
    "id": 8,
    "category": "plumbing",
    "total_price": 1200.00,
    "paid": 1000.00,
    "icon": "🚰",
    "color": "#F2FF33",
    "transactions": [
      { "date": "2023-06-01", "amount": 500.00 },
      { "date": "2023-06-15", "amount": 500.00 }
    ]
  },
  {
    "id": 9,
    "category": "electric",
    "total_price": 1800.00,
    "paid": 1400.00,
    "icon": "🔌",
    "color": "#FF33F2",
    "transactions": [
      { "date": "2023-07-01", "amount": 900.00 },
      { "date": "2023-07-15", "amount": 500.00 }
    ]
  },
  {
    "id": 10,
    "category": "sand",
    "total_price": 500.00,
    "paid": 300.00,
    "icon": "🏖️",
    "color": "#33FFA8",
    "transactions": [
      { "date": "2023-08-01", "amount": 300.00 }
    ]
  }
];

// Function to capitalize the first letter of the category
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CardComponent() {
  const [expandedId, setExpandedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handlePress = (id) => {
    // Toggle expandedId to show/hide details dropdown
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCardPress = (item) => {
    setSelectedCategory(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.text}>{capitalizeFirstLetter(item.category)}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(item.id)}>
              <Image source={icons.plus} resizeMode='contain' style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          {isExpanded && (
            <View style={styles.detailsContainer}>
              <View className='w-1/2'>
                <Text className='font-pregular'> <Text className='font-psemibold'>Total Price:</Text> ${item.total_price.toFixed(2)}</Text>
                <Text className='font-pregular'> <Text className='font-psemibold'>Paid:</Text>  ${item.paid.toFixed(2)}</Text>
              </View>
              <View className='w-1/2 pl-5 '>
                <Text className='font-pregular'> <Text className='font-psemibold'>Unpaid:</Text> ${item.total_price.toFixed(2) - item.paid.toFixed(2)}</Text>
                <Text className='font-pregular'> <Text className='font-psemibold'>Quantity:</Text> ${item.paid.toFixed(2)}</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={jsonData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      <CategoryDetailsModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  cardContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
});
