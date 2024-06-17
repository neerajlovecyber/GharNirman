import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { realtimeDb } from '../../services/firebaseServices';
import { ref, push, set, onValue } from 'firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpenseTrackerComponent = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [paid, setPaid] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [categories, setCategories] = useState(['bricks', 'cement']);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        const userId = 'neerajlovecyber';
        const expensesRef = ref(realtimeDb, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            setExpenses(expenses);
        });
    };

    const handleAddExpense = () => {
        const userId = 'neerajlovecyber';
        const expenseRef = ref(realtimeDb, `users/${userId}/expenses`);
        const newExpenseRef = push(expenseRef);

        const parsedPrice = parseFloat(price) || 0;
        const parsedQuantity = parseInt(quantity) || 0;

        if (!description || parsedPrice <= 0 || parsedQuantity <= 0 || !selectedCategory) {
            alert('Please fill all fields correctly.');
            return;
        }

        const newExpense = {
            description: description,
            price: parsedPrice,
            quantity: parsedQuantity,
            total: parsedPrice * parsedQuantity,
            paid: paid,
            category: selectedCategory,
        };

        set(newExpenseRef, newExpense);
        setDescription('');
        setPrice('');
        setQuantity('');
        setPaid(false);
        setSelectedCategory('');
    };

    const handleAddCustomCategory = () => {
        if (customCategory && !categories.includes(customCategory)) {
            setCategories([...categories, customCategory]);
            setCustomCategory('');
            setSelectedCategory(customCategory);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>Description: {item.description}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Total: {item.total}</Text>
            <Text>Paid: {item.paid ? 'Yes' : 'No'}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ padding: 20 }}>
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Price"
                            value={price}
                            onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Quantity"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <View style={styles.paidContainer}>
                            <Text>Paid: </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: paid ? '#2196F3' : '#CCCCCC',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                                onPress={() => setPaid(!paid)}
                            >
                                <Text style={{ color: 'white' }}>{paid ? 'Paid' : 'Unpaid'}</Text>
                            </TouchableOpacity>
                        </View>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedCategory(value)}
                            items={categories.map((category) => ({ label: category, value: category }))}
                            placeholder={{ label: "Select a category", value: null }}
                            value={selectedCategory}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                            placeholder="Add Custom Category"
                            value={customCategory}
                            onChangeText={setCustomCategory}
                            onSubmitEditing={handleAddCustomCategory}
                            style={styles.input}
                        />
                        <Button title="Add Expense" onPress={handleAddExpense} />
                    </View>
                </ScrollView>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Expenses:</Text>
                    <FlatList
                        data={expenses}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={{ flex: 1 }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        padding: 5,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    paidContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 20,
    },
});

export default ExpenseTrackerComponent;
