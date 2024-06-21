import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import AddComponent from './AddComponent'; // Adjust the import according to your file structure
import SingleCategoryComponent from './SingleCategoryComponent'; // Import the new component

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
          <View className='h-14 bg-black-100 w-[100%]'>
            <Text style={styles.modalTitle} className='text-secondary-200 font-pbold'>
              {category.icon}
              {category.category && category.category.charAt(0).toUpperCase() + category.category.slice(1)}
            </Text>
          </View>
          
          <SafeAreaView style={styles.scrollContainer}>
            <ScrollView>
              <FlatList
                data={transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <SingleCategoryComponent date={item.date} amount={item.amount} />
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
      <View className='left-0 bottom-0 w-[100%] absolute'>
        {addModalVisible && (
          <AddComponent
            onClose={() => setAddModalVisible(false)}
            onSubmit={handleAddTransaction}
            selectedCategory={category.category}
          />
        )}
      </View>
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 20,
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
    backgroundColor:'#EEEEEE',
    flex: 1,
    marginBottom: 0,
    
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
