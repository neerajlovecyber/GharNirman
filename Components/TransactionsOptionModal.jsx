import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const TransactionOptionsModal = ({ visible, transaction, onClose, onDelete, onEdit }) => {
  if (!transaction) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Options</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              onEdit(transaction);
              onClose();
            }}
          >
            <Text style={styles.optionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            <Text style={styles.optionButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.optionButtonText}>X</Text>
          </TouchableOpacity>
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
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FF8F00',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton:{
    marginTop: 10,
    position:'absolute',
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    top:1,
    right:10,
    backgroundColor:'#FF8E01'
  }
});

export default TransactionOptionsModal;
