import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import SingleCategoryComponent from '../../Components/SingleCategoryComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const History = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [transactions, setTransactions] = useState([
    { description: 'Burger', amount: 10, quantity: 1, date: '2023-06-19', status: 'Paid', category: 'Food' },
    { description: 'Pizza', amount: 15, quantity: 1, date: '2023-06-19', status: 'Unpaid', category: 'Food' },
    { description: 'Bus Ticket', amount: 3, quantity: 1, date: '2023-06-17', status: 'Paid', category: 'Transport' },
    { description: 'Shoes', amount: 50, quantity: 1, date: '2023-06-16', status: 'Paid', category: 'Shopping' },
    { description: 'Groceries', amount: 30, quantity: 1, date: '2023-06-15', status: 'Unpaid', category: 'Shopping' },
    { description: 'Shoes', amount: 50, quantity: 1, date: '2023-06-16', status: 'Paid', category: 'Shopping' },
    { description: 'Groceries', amount: 30, quantity: 1, date: '2023-06-15', status: 'Unpaid', category: 'Shopping' },
    { description: 'Shoes', amount: 50, quantity: 1, date: '2023-06-16', status: 'Paid', category: 'Shopping' },
    { description: 'Groceries', amount: 30, quantity: 1, date: '2023-06-15', status: 'Unpaid', category: 'Shopping' },
    { description: 'Shoes', amount: 50, quantity: 1, date: '2023-06-16', status: 'Paid', category: 'Shopping' },
    { description: 'Groceries', amount: 30, quantity: 1, date: '2023-06-15', status: 'Unpaid', category: 'Shopping' },
  ]);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    filterTransactions();
  }, [searchText, selectedCategory, selectedStatus]);

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchText) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(transaction => transaction.category === selectedCategory);
    }

    if (selectedStatus) {
      filtered = filtered.filter(transaction => transaction.status === selectedStatus);
    }

    setFilteredTransactions(filtered);
  };

  const renderItem = ({ item, index }) => {
    // Render the date if it's the first transaction or the current transaction's date is different from the previous one
    const showDate = index === 0 || transactions[index - 1].date !== item.date;

    return (
      <View style={styles.transactionContainer}>
        {showDate && <Text style={styles.dateText}>{item.date}</Text>}
        <SingleCategoryComponent
          description={item.description}
          amount={item.amount}
          quantity={item.quantity}
          status={item.status}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} className='text-secondary-200'>History</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Description..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.filterRow}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="All Categories" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Shopping" value="Shopping" />
        </Picker>
        <Picker
          selectedValue={selectedStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="All Status" value="" />
          <Picker.Item label="Paid" value="Paid" />
          <Picker.Item label="Unpaid" value="Unpaid" />
        </Picker>
      </View>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '48%',
  },
  transactionContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default History;
