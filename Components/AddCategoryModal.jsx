import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

const emojis = [
  '😊', '🚗', '🏠', '🍔', '🎉', '🛍️', '✈️', '📚', '💡', '🛏️', 
  '🎁', '💊', '🎵', '📷', '🍕'
];

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleAdd = () => {
    if (categoryName && selectedEmoji) {
      onAddCategory({ name: categoryName, emoji: selectedEmoji });
      setCategoryName('');
      setSelectedEmoji('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <Text style={styles.modalTitle}>Select Emoji</Text>
          <FlatList
            data={emojis}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.emoji,
                  selectedEmoji === item && styles.selectedEmoji
                ]}
                onPress={() => setSelectedEmoji(item)}
              >
                <Text style={styles.emojiText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  emoji: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedEmoji: {
    backgroundColor: '#3572EF',
    borderColor: '#3572EF',
  },
  emojiText: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: '#3572EF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#3572EF',
    fontSize: 16,
  },
});

export default AddCategoryModal;
