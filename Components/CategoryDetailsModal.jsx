import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AddComponent from './AddComponent';
import SingleCategoryComponent from './SingleCategoryComponent';
import TransactionOptionsModal from './TransactionsOptionModal';
import { useUser } from '../services/userContext';

const CategoryDetailsModal = ({ visible, category, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { categories, handleAddExpense, handleEditExpense, handleDeleteExpense } = useUser(); // Assuming useUser provides necessary functions

  // Update transactions when category changes
  useEffect(() => {
    if (category && category.transactions) {
      const sortedTransactions = [...category.transactions].sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
      setTransactions(sortedTransactions);
    } else {
      setTransactions([]);
    }
  }, [category]);

  // Function to handle adding a new transaction
  const handleNewTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions); // Update local state
    handleAddExpense(newTransaction); // Call global update function
    closeAddModal();
  };

  // Function to handle editing an existing transaction
  const handleEditTransaction = (editedTransaction) => {
    if (!selectedTransaction) return;

    const { index } = selectedTransaction;
    const updatedTransactions = transactions.map((transaction, i) =>
      i === index ? editedTransaction : transaction
    );
    setTransactions(updatedTransactions); // Update local state
    handleEditExpense(category.category, index, editedTransaction); // Call global update function
    closeAddModal();
  };

  // Function to handle deleting an existing transaction
  const handleDeleteTransaction = async () => {
    if (!selectedTransaction) return;

    const { index } = selectedTransaction;
    await handleDeleteExpense(category.category, index); // Call global update function

    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions); // Update local state
    closeOptionsModal();
  };

  // Function to open the modal for adding/editing a transaction
  const openAddModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setAddModalVisible(true);
  };

  // Function to close the modal for adding/editing a transaction
  const closeAddModal = () => {
    setAddModalVisible(false);
    setSelectedTransaction(null);
  };

  // Function to open the modal for options (edit/delete) of a transaction
  const openOptionsModal = (transaction, index) => {
    setSelectedTransaction({ ...transaction, index });
    setOptionsModalVisible(true);
  };

  // Function to close the modal for options (edit/delete) of a transaction
  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
    setSelectedTransaction(null);
  };

  // Render function for each transaction item in the list
  const renderTransactionItem = ({ item, index }) => (
    <SingleCategoryComponent
      description={item.description}
      amount={item.price}
      totalAmount={item.totalPrice}
      quantity={item.quantity}
      date={item.purchaseDate}
      status={item.isPaid ? 'Paid' : 'Unpaid'}
      onOptionsPress={() => openOptionsModal(item, index)}
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

          <TouchableOpacity style={styles.fixedButton} onPress={() => openAddModal()}>
            <Text style={styles.fixedButtonText}>+</Text>
          </TouchableOpacity>

          <Modal
            visible={addModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeAddModal}
          >
            <View style={styles.modalContainer1}>
              <View style={styles.modalContent}>
                <AddComponent
                  categories={categories.map(cat => cat.category)}
                  selectedCategory={category.category}
                  onSubmit={selectedTransaction ? handleEditTransaction : handleNewTransaction}
                  onClose={closeAddModal}
                  initialData={selectedTransaction}
                />
              </View>
              <TouchableOpacity style={styles.closeButton1} onPress={closeAddModal}>
                <Text style={styles.closeButtonText1}>X</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <TransactionOptionsModal
              visible={optionsModalVisible}
              transaction={selectedTransaction} // Ensure selectedTransaction is correctly set
              onClose={closeOptionsModal}
              onDelete={handleDeleteTransaction}
              onEdit={() => {
                closeOptionsModal();
                openAddModal(selectedTransaction);
              }}
            />


        </View>
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
    flex: 1,
    width: '100%',
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
  modalContainer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  closeButton1: {
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
  closeButtonText1: {
    fontSize: 20,
    color: '#fff',
  },
});

export default CategoryDetailsModal;
