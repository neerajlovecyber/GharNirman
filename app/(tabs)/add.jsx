import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { realtimeDb } from '../../services/firebaseServices';
import { ref, push, set, onValue } from 'firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpenseTrackerComponent = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [paid, setPaid] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('bricks');
    const [bricksExpenses, setBricksExpenses] = useState([]);
    const [cementExpenses, setCementExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses(selectedCategory);
    }, [selectedCategory]);

    const fetchExpenses = (category) => {
        const userId = 'neerajlovecyber';
        const categoryRef = ref(realtimeDb, `users/${userId}/categories/${category}`);
        
        onValue(categoryRef, (snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            if (category === 'bricks') {
                setBricksExpenses(expenses);
            } else if (category === 'cement') {
                setCementExpenses(expenses);
            }
        });
    };

    const handleAddExpense = () => {
        const userId = 'neerajlovecyber';
        const category = selectedCategory;
        const expenseRef = ref(realtimeDb, `users/${userId}/categories/${category}`);
        const newExpenseRef = push(expenseRef);

        const newExpense = {
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            total: parseFloat(price) * parseInt(quantity),
            paid: paid,
        };

        set(newExpenseRef, newExpense);
    };

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Text>{item.description}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Total: {item.total}</Text>
            <Text>Paid: {item.paid ? 'Yes' : 'No'}</Text>
        </View>
    );

    const renderCategoryButtons = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategory === 'bricks' ? '#2196F3' : '#CCCCCC',
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 10,
                }}
                onPress={() => setSelectedCategory('bricks')}
            >
                <Text style={{ color: 'white' }}>Bricks</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategory === 'cement' ? '#2196F3' : '#CCCCCC',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => setSelectedCategory('cement')}
            >
                <Text style={{ color: 'white' }}>Cement</Text>
            </TouchableOpacity>
        </View>
    );

    return (<SafeAreaView>
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <Button title="Add Expense" onPress={handleAddExpense} />

            {renderCategoryButtons()}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{selectedCategory === 'bricks' ? 'Bricks' : 'Cement'} Expenses:</Text>
            <FlatList
                data={selectedCategory === 'bricks' ? bricksExpenses : cementExpenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
        </SafeAreaView>
    );
};

export default ExpenseTrackerComponent;
