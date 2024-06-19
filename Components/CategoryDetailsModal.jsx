import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList, ScrollView, SafeAreaView } from 'react-native';
import AddComponent from './AddComponent'; // Adjust the import according to your file structure

const CategoryDetailsModal = ({ visible, category, onClose }) => {
  const [transactions, setTransactions] = useState(category.transactions || []);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setAddModalVisible(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {category.category && category.category.charAt(0).toUpperCase() + category.category.slice(1)} Transactions
          </Text>
          <SafeAreaView style={styles.scrollContainer}>
            <ScrollView>
              <FlatList
                data={transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionText}>Date: {item.date}</Text>
                    <Text style={styles.transactionText}>Amount: ${item.amount}</Text>
                  </View>
                )}
              />
            </ScrollView>
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
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    top: 10,
    left: 40,
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
    width: '100%',
    flex: 1,
    marginTop: 60, // Adjust according to your title position
    marginBottom: 0, // Adjust according to your button position
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionText: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#33FF57',
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
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
