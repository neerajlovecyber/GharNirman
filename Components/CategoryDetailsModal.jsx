import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AddComponent from './AddComponent'; // Adjust the import according to your file structure
import SingleCategoryComponent from './SingleCategoryComponent'; // Import the new component

const CategoryDetailsModal = ({ visible, category, onClose }) => {
  const [transactions, setTransactions] = useState(category.transactions || []);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    setAddModalVisible(false);
  };

  const renderTransactionItem = ({ item }) => (
    <SingleCategoryComponent
      description={item.description}
      amount={item.price}
      totalAmount = {item.totalPrice}
      quantity={item.quantity}
      date={item.purchaseDate}
      status={item.isPaid ? 'Paid' : 'Unpaid'}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {category.icon} {category.category && category.category.charAt(0).toUpperCase() + category.category.slice(1)}
            </Text>
          </View>
          
          <SafeAreaView style={styles.scrollContainer}>
            <FlatList
              data={transactions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderTransactionItem}
              contentContainerStyle={styles.flatListContainer}
            />
          </SafeAreaView>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fixedButton} onPress={() => setAddModalVisible(true)}>
            <Text style={styles.fixedButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {addModalVisible && (
        <AddComponent
          onClose={() => setAddModalVisible(false)}
          onSubmit={handleAddTransaction}
          selectedCategory={category.category}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitleContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#FF8F00',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#FF8F00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fixedButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  flatListContainer: {
    flexGrow: 1,
    backgroundColor: '#EEEEEE',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 35,
    height: 35,
    backgroundColor: '#FF8F00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default CategoryDetailsModal;
