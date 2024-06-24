import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import SingleCategoryComponent from '../../Components/SingleCategoryComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../../services/userContext'; // Import the useUser hook

const History = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const { categories } = useUser(); // Use the useUser hook to get categories

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    filterTransactions();
  }, [searchText, selectedCategory, selectedStatus, categories]);

  const filterTransactions = () => {
    let allTransactions = [];

    // Combine transactions from all categories
    categories.forEach(category => {
      allTransactions = allTransactions.concat(category.transactions.map(transaction => ({
        ...transaction,
        category: category.category,
      })));
    });

    let filtered = allTransactions;

    if (searchText) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(transaction => transaction.category === selectedCategory);
    }

    if (selectedStatus) {
      filtered = filtered.filter(transaction => transaction.isPaid === (selectedStatus === 'Paid'));
    }

    setFilteredTransactions(filtered);
  };

  const renderItem = ({ item, index }) => {
    // Render the date if it's the first transaction or the current transaction's date is different from the previous one
    const showDate = index === 0 || filteredTransactions[index - 1].date !== item.date;

    return (
      <View style={styles.transactionContainer}>
        {showDate && <Text style={styles.dateText}>{item.date}</Text>}
        <SingleCategoryComponent
          description={item.description}
          amount={item.totalPrice}
          quantity={item.quantity}
          status={item.isPaid ? 'Paid' : 'Unpaid'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} className="text-secondary-200">History</Text>
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
          {categories.map(category => (
            <Picker.Item key={category.category} label={category.category} value={category.category} />
          ))}
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
