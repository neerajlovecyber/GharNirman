import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddComponent = ({ onClose, onSubmit, selectedCategory, categories }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(selectedCategory || '');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isPaid, setIsPaid] = useState(true);
  const [totalPrice, setTotalPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (!validateInputs()) {
      Alert.alert('Invalid Input', 'Please fill in all required fields correctly.');
      return;
    }

    const expenseData = {
      description,
      category: category,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      isPaid,
      totalPrice: parseFloat(totalPrice),
      purchaseDate: purchaseDate.toISOString(),
    };

    onSubmit(expenseData);
    resetForm();
    onClose();
  };

  const validateInputs = () => {
    if (!description || !category || !price || !quantity || !totalPrice) {
      return false;
    }

    if (isNaN(parseFloat(price)) || isNaN(parseFloat(quantity)) || isNaN(parseFloat(totalPrice))) {
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setDescription('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setTotalPrice('');
    setPurchaseDate(new Date());
    setIsPaid(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPurchaseDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.categoryContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
            
          </Picker>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <TextInput
          style={styles.inputPrice}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputPrice}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Total Price"
        value={totalPrice}
        onChangeText={setTotalPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
        <Text style={styles.buttonText}>
          {purchaseDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={purchaseDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.typeButton, isPaid && styles.selectedButton]}
          onPress={() => setIsPaid(true)}
        >
          <Text style={styles.buttonText}>Paid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, !isPaid && styles.selectedButton]}
          onPress={() => setIsPaid(false)}
        >
          <Text style={styles.buttonText}>Unpaid</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    width: '100%',
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',

  },
  inputPrice: {
    borderWidth: 1,
    borderColor: '#444444',
    width: '48%',
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',

  },
  categoryContainer: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444444',
    width: '100%',
    height: 45,
    marginBottom: 10,
    borderColor: '#ddd',
    opacity:0.6
  },
  customCategoryContainer: {
    width: '100%',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#3DC2EC',
    width: '48%',
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3DC2EC',
  },
  submitButton: {
    backgroundColor: 'green',
    width: '48%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    width: '48%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF5733',
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButton: {
    backgroundColor: '#3DC2EC',
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    opacity:0.8
  },
});

export default AddComponent;
