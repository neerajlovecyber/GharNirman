import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import SingleCategoryComponent from '../../Components/SingleCategoryComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../../services/userContext';

const History = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const { categories } = useUser();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    console.log("Effect triggered");
    filterTransactions();
  }, [searchText, selectedCategory, selectedStatus, categories]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const filterTransactions = () => {
    console.log("Filtering transactions...");
    let allTransactions = [];
    categories.forEach(category => {
      allTransactions = allTransactions.concat(category.transactions.map(transaction => ({
        ...transaction,
        category: category.category,
      })));
    });
    console.log("All transactions:", allTransactions);

    // Sort transactions by purchaseDate in descending order
    allTransactions.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    console.log("Sorted transactions:", allTransactions);

    // Apply filters
    let filtered = allTransactions;

    if (searchText) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    console.log("Filtered by searchText:", filtered);

    if (selectedCategory !== "") {
      filtered = filtered.filter(transaction => transaction.category === selectedCategory);
    }
    console.log("Filtered by selectedCategory:", filtered);

    if (selectedStatus === "Paid" || selectedStatus === "Unpaid") {
      filtered = filtered.filter(transaction => transaction.isPaid === (selectedStatus === 'Paid'));
    }
    console.log("Filtered by selectedStatus:", filtered);

    setFilteredTransactions(filtered);
  };

  const renderItem = ({ item, index }) => {
    console.log("Rendering item:", item);
    const showDate = index === 0 || filteredTransactions[index - 1].purchaseDate !== item.purchaseDate;

    return (
      <View style={styles.transactionContainer}>
        {showDate && <Text style={styles.dateText}>{capitalizeFirstLetter(item.category)}</Text>}
        <SingleCategoryComponent
          description={item.description}
          amount={item.price}
          totalAmount={item.totalPrice}
          quantity={item.quantity}
          date={item.purchaseDate}
          status={item.isPaid ? 'Paid' : 'Unpaid'}
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
      <View className="rounded-lg bg-white w-1/2 m-0 p-0">

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
        </View>
          <View className="rounded-lg bg-white w-[47%] ml-2 p-0">
        <Picker 
          selectedValue={selectedStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="All Status" value="" />
          <Picker.Item label="Paid" value="Paid" />
          <Picker.Item label="Unpaid" value="Unpaid" />
        </Picker></View>
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
    height: 50,
    borderColor: '#ddd',
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    margin: 10,
    marginTop:15
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding:10
  },
  picker: {
    width: '100%',

    
  },
  transactionContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 3,
    marginLeft: 10,
  },
});

export default History;
