import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SingleCategoryComponent = ({ description, amount, totalAmount, quantity, date, status, onOptionsPress }) => {
  const statusColor = status === 'Paid' ? '#4CAF50' : '#F44336';

  // Function to format date to 'YYYY-MM-DD'
  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
  };

  // Function to truncate description to 25 characters
  const truncateDescription = (inputDescription) => {
    if (inputDescription.length > 25) {
      return inputDescription.slice(0, 25) + '...';
    }
    return inputDescription;
  };

  return (
    <View style={styles.transactionRow}>
      <View style={styles.leftColumn}>
        <Text style={[styles.transactionText, styles.boldText]}>{truncateDescription(description)}</Text>
        <Text style={styles.transactionText}>Price: ₹{amount.toFixed(2)}</Text>
        <Text style={styles.transactionText}>Quantity: {quantity}</Text>
      </View>
      <View style={styles.midColumn}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.transactionText}>Date: {formatDate(date)}</Text>
        <Text style={styles.transactionText}>Total: ₹{totalAmount ? totalAmount.toFixed(2) : 'N/A'}</Text>
      </View>
      <View style={styles.rightColumn}> 
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={onOptionsPress}
        >
          <Text style={styles.optionsButtonText}>⋮</Text>
        </TouchableOpacity></View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    marginLeft:8,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  midColumn: {
    
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  transactionText: {
    fontSize: 12,
    opacity: 0.8,
  },
  boldText: {
    fontWeight: '500',
  },
  statusBadge: {
    width: 50,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  optionsButton: {
    paddingLeft:15,
    paddingTop:12,
  },
  optionsButtonText: {
    fontSize: 20,
    color: '#FF8F00',
  },
});

export default SingleCategoryComponent;
