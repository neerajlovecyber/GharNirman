import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from 'react-native-flash-message';

const AddComponent = ({ onClose, onSubmit, selectedCategory, categories, initialData }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isPaid, setIsPaid] = useState(true); 
  const [totalPrice, setTotalPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
      setPrice(initialData.price?.toString() || '');
      setQuantity(initialData.quantity?.toString() || '');
      setIsPaid(initialData.isPaid ?? true);
      setTotalPrice(initialData.totalPrice?.toString() || '');
      setPurchaseDate(new Date(initialData.purchaseDate || Date.now()));
    }
  }, [initialData]);

  useEffect(() => {
    if (selectedCategory && !initialData) { // Do not update if in edit mode
      setCategory(selectedCategory);
    }
  }, [selectedCategory, initialData]);

  const handleSubmit = () => {
    if (!validateInputs()) {
      if (!description) {
        showMessage({
          message: 'Missing Description',
          description: 'Please enter a description.',
          type: 'danger',
        });
      } else if (!category) {
        showMessage({
          message: 'Missing Category',
          description: 'Please select a category.',
          type: 'danger',
        });
      } else if (!price) {
        showMessage({
          message: 'Missing Price',
          description: 'Please enter a price.',
          type: 'danger',
        });
      } else if (!quantity) {
        showMessage({
          message: 'Missing Quantity',
          description: 'Please enter a quantity.',
          type: 'danger',
        });
      } else if (!totalPrice) {
        showMessage({
          message: 'Missing Total Price',
          description: 'Please enter a total price.',
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Invalid Input',
          description: 'Price cannot exceed 10 crore, Quantity cannot exceed 10 lakh, and Total Price cannot exceed 100 crore.',
          type: 'danger',
        });
      }
      return;
    }

    const expenseData = {
      description,
      category,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      isPaid,
      totalPrice: parseFloat(totalPrice),
      purchaseDate: purchaseDate.toISOString(),
    };

    onSubmit(expenseData, initialData ? initialData.index : null);

    resetForm();
    onClose();
  };

  const validateInputs = () => {
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseFloat(quantity);
    const parsedTotalPrice = parseFloat(totalPrice);

    if (!description || !category || !price || !quantity || !totalPrice) {
      return false;
    }

    if (isNaN(parsedPrice) || isNaN(parsedQuantity) || isNaN(parsedTotalPrice)) {
      return false;
    }

    // Maximum limits
    if (parsedPrice > 1000000000 || parsedQuantity > 1000000 || parsedTotalPrice > 10000000000) {
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
          <Text style={[styles.buttonText, { color: '#000', opacity: 0.5 }]}>Paid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, !isPaid && styles.selectedButton]}
          onPress={() => setIsPaid(false)}
        >
          <Text style={[styles.buttonText, { color: '#000', opacity: 0.5 }]}>Unpaid</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>{initialData ? 'Edit Expense' : 'Add Expense'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={[styles.buttonText, { color: '#000', opacity: 0.5 }]}>Cancel</Text>
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
    height: 50,
    paddingTop: 0,
    marginBottom: 10,
    borderColor: '#ddd',
    opacity: 0.6
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
    borderColor: '#ddd',
    width: '48%',
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  submitButton: {
    backgroundColor: '#FF9C01',
    width: '48%',
    height: 40,
    color: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    width: '48%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default AddComponent;
