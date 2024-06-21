import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import icons from '../constants/icons'; // Assuming this is the correct path to your icons
import CategoryDetailsModal from './CategoryDetailsModal'; // Import the new component

// Function to capitalize the first letter of the category
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CardComponent({ data }) { // Accept data as a prop
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
        data={data} // Use the data prop here
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
