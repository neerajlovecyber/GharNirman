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
            style={styles.optionButton}
            onPress={onClose}
          >
            <Text style={styles.optionButtonText}>Cancel</Text>
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
    width: '80%',
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
    padding: 15,
    backgroundColor: '#FF8F00',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransactionOptionsModal;
