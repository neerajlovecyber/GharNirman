import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView, Dimensions, Image } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images } from "../../constants"; // Make sure these imports are correct
import { Rows } from 'lucide-react';

const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState('');

  const pieChartData = [
    { name: 'Spent', population: 500, color: '#f00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Remaining', population: 1500, color: '#00f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [50, 100, 150, 200, 250],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const handleAddBudget = () => {
    // Handle budget logic here
    console.log(`Budget set to: ${budget}`);
    setModalVisible(false);
    // Reset budget field
    setBudget('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView className='w-full min-h-[100vh] '>

        <View style={styles.topBar} className='w-full h-14  bg-primary justify-between flex-row items-center pr-4 pl-4'>

          <TouchableOpacity onPress={() => {/* Logic to open sidebar */}}>
            <Image source={images.menuButton}  resizeMode = "contain" className=' w-9 h-9 text-secondary-200'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Logic to open profile */}}>
            <Image source={images.profile} resizeMode = "contain" style={styles.icon} className='border-r-5 w-6 h-4'/>
          </TouchableOpacity>
        </View>
        <View style={styles.card} className='h-44 bg-black'>
        <Text className=''>Hi Tim</Text>
         <Text>Your current amount</Text>
         <Text style={styles.budgetButtonText}>Add Budget Amount</Text>
         <TouchableOpacity style={styles.budgetButton} onPress={() => setModalVisible(true)}>
        </TouchableOpacity>

        </View>
       
        <View style={styles.chartContainer}>
        <Text style={styles.userName} className='text-secondary-200'>User: [User Name]</Text>

          <Text style={styles.chartTitle}>Total Balance & Amount Spent</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Expense Tracker</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddExpense')}>
            <Text style={styles.actionButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.actionButtonText}>View Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Reports')}>
            <Text style={styles.actionButtonText}>Generate Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Adding Budget */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add Budget Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Budget Amount"
                keyboardType="numeric"
                value={budget}
                onChangeText={setBudget}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#ff5c5c" />
                <Button title="Submit" onPress={handleAddBudget} color="#28a745" />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  card:{
     width:'93%',
     backgroundColor:'#fff',
     borderRadius:10,
     margin:10,
     marginTop: 20,
     marginBottom:20,
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  // topBar: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  //   backgroundColor:'black',
  //   paddingHorizontal: 10,
  //   marginBottom: 20,
  // },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  budgetButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  budgetButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Home;
