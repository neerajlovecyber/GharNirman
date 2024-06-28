import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import icons from '../constants/icons';
import CategoryDetailsModal from './CategoryDetailsModal';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const parseNumber = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

const calculateTotalPrice = (transactions) => {
  return transactions.reduce((total, transaction) => {
    const price = parseNumber(transaction.totalPrice);
    return total + (price || 0);
  }, 0);
};

const calculatePaid = (transactions) => {
  return transactions.reduce((total, transaction) => {
    const price = parseNumber(transaction.totalPrice);
    return transaction.isPaid ? total + (price || 0) : total;
  }, 0);
};

const calculateUnpaid = (totalPrice, paid) => {
  if (totalPrice !== null && paid !== null) {
    return totalPrice - paid;
  }
  return null;
};

const calculateQuantity = (transactions) => {
  return transactions.reduce((total, transaction) => {
    const quantity = parseNumber(transaction.quantity);
    return total + (quantity || 0);
  }, 0);
};

export default function CardComponent({ data }) {
  const [expandedId, setExpandedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardPress = (item) => {
    setSelectedCategory(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    const totalPrice = calculateTotalPrice(item.transactions || []);
    const paid = calculatePaid(item.transactions || []);
    const unpaid = calculateUnpaid(totalPrice, paid);
    const quantity = calculateQuantity(item.transactions || []);

    return (
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.text}>{capitalizeFirstLetter(item.category)}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}>
              <Image source={icons.dropdown} resizeMode='contain' style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          {isExpanded && (
            <View style={styles.detailsContainer}>
              <View style={styles.column}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Total Price:</Text> ₹{totalPrice !== null ? totalPrice.toFixed(2) : 'N/A'}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Paid:</Text> ₹{paid !== null ? paid.toFixed(2) : 'N/A'}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Unpaid:</Text> ₹{unpaid !== null ? unpaid.toFixed(2) : 'N/A'}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Quantity:</Text> {quantity !== null ? quantity : 'N/A'}
                </Text>
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
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      {modalVisible && selectedCategory && (
        <CategoryDetailsModal
          visible={modalVisible}
          category={selectedCategory}
          onClose={() => setModalVisible(false)}
        />
      )}
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
    opacity: 0.7,
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailText: {
    fontSize: 13,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
