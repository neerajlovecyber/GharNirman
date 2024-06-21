// SingleCategoryComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleCategoryComponent = ({ description, amount, quantity, date, status }) => {
  return (
    <View style={styles.transactionRow}>
      <View>
        <Text style={[styles.transactionText, styles.boldText]}>Description: {description}</Text>
        <Text style={styles.transactionText}>Amount: ${amount}</Text>
        <Text style={styles.transactionText}>Quantity: {quantity}</Text>
      </View>
      <View>
        <View style={[styles.statusBadge, status === 'Paid' ? styles.paid : styles.unpaid]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.transactionText}>Date: {date}</Text>
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
    margin: 8,
    borderRadius: 10,
    padding: 8,
  },
  transactionText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: '600',
  },
  statusBadge: {
    width: 50,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: -15,
    right: -12,
  },
  paid: {
    backgroundColor: '#FF8F00',
  },
  unpaid: {
    backgroundColor: '#FF0000',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SingleCategoryComponent;
