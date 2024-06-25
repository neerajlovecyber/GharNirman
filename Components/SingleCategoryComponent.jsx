import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleCategoryComponent = ({ description, amount, totalAmount, quantity, date, status }) => {
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
        <Text style={[styles.transactionText, styles.boldText]}>Description: {truncateDescription(description)}</Text>
        <Text style={styles.transactionText}>Amount: ₹{amount.toFixed(2)}</Text>
        <Text style={styles.transactionText}>Quantity: {quantity}</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.transactionText}>Date: {formatDate(date)}</Text>
        <Text style={styles.transactionText}>Total: ₹{totalAmount ? totalAmount.toFixed(2) : 'N/A'}</Text>
      </View>
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
  rightColumn: {
    alignItems: 'flex-end',
  },
  transactionText: {
    fontSize: 14,
    opacity:0.8
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
});

export default SingleCategoryComponent;
