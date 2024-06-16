import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView, Dimensions, Image } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'; // Ensure these imports are correct
import * as Progress from 'react-native-progress';
import CategoriesCard from '../../Components/CategoriesCard';

const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedSlice, setSelectedSlice] = useState(null);

  const pieChartData = [
    { name: 'Spent', population: 500, color: '#FF6969', legendFontColor: '#FF6969', legendFontSize: 15 },
    { name: 'Remaining', population: 1500, color: '#3572EF', legendFontColor: '#3572EF', legendFontSize: 15 },
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
    backgroundColor: '#3572EF',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#FF6969',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const handleAddBudget = () => {
    const newBudget = parseFloat(budget) || 0; // Parse the new budget value as a float
    setAmount(newBudget);
    setModalVisible(false); // Close the modal
    setBudget(''); // Reset the input field to an empty string
  };

  const handlePieChartPress = (data, index) => {
    setSelectedSlice(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView className='w-full min-h-[85vh]'>

        <View style={styles.topBar} className='w-full h-14 bg-primary justify-between flex-row items-center pr-4 pl-4'>

          <TouchableOpacity onPress={() => {/* Logic to open sidebar */}} className='w-1/2'>
            <Image source={images.logo} resizeMode="contain" className='w-24 text-secondary-200' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Logic to open profile */}}>
            <Image source={images.profile} resizeMode="contain" style={styles.icon} className='border-r-5 w-6 h-4' />
          </TouchableOpacity>
        </View>
        <Text className='text-2xl text-secondary-200 text-semibold mt-2 ml-5 font-pextrabold'>Hi Tim, Welcome</Text>

        <View style={styles.card} className='h-44 p-5 flex-row justify-between items-center'>
          <View className='w-1/2'>
            <Text className='text-l text-gray-500 text-semibold font-pregular'>Total Budget</Text>
            <Text className='font-psemibold'>{amount} {amount === 0 ? '' : 'INR'}</Text>
            <Text className='text-l text-gray-500 text-semibold font-pregular'>Spent Amount</Text>
            <Text className='font-psemibold'>{amount} {amount === 0 ? '' : 'INR'}</Text>
            <Text className='text-l text-gray-500 text-semibold font-pregular'>Remaining Amount</Text>
            <Text className='font-psemibold'>{amount} {amount === 0 ? '' : 'INR'}</Text>
          </View>
          <View className='w-1/2 '>
            <TouchableOpacity onPress={() => handlePieChartPress(pieChartData[0], 0)}>
              <PieChart
                data={pieChartData}
                width={screenWidth}
                height={130}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                absolute
                hasLegend={false}
              />
            </TouchableOpacity>
             <TouchableOpacity style={styles.budgetButton} className='w-4/5 mt-1 h-6 ml-7 text-secondary flex-column text-center items-center justify-center' onPress={() => setModalVisible(true)}>
         <Text className='text-xs text-black font-semibold'> {amount === 0 ? 'Add amount' : 'Edit amount'}</Text>     
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card} className='h-25 p-5 w-full flex-column justify-between items-center'>
      <View className='flex-row'>
        <View className='w-1/2'>
        <Text className='text-l  text-gray-500 text-semibold font-pregular'>Paid Amount</Text>
        <Text className='font-psemibold'>{amount} {amount === 0 ? '' : 'INR'}</Text>
        </View>
        <View className='w-1/2'>
        <Text className='text-l  text-gray-500 text-semibold font-pregular pl-7'>Unpaid Amount</Text>
        <Text className='font-psemibold pl-7'>{amount} {amount === 0 ? '' : 'INR'}</Text>
        </View>
        
      </View>
      <View className='w-full mt-4'>
        <Progress.Bar 
          progress={0.6} 
          width={290} 
          height={10} 
          color="blue" 
          unfilledColor="black" 
          borderWidth={0} 
          borderRadius={5} 
        />
      </View>
    </View>
        <View className='pl-3 mt-2'>
          <Text className='text-primary-200 font-pbold text-xl mb-2'>Categories</Text>
          <CategoriesCard/>
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

        {/* Tooltip Modal for Pie Chart Slice */}
        {selectedSlice && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => setSelectedSlice(null)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>{selectedSlice.name}: {selectedSlice.population}</Text>
                <Button title="Close" onPress={() => setSelectedSlice(null)} />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  card: {
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    marginTop: 10,
    marginBottom: 0,
    display: 'flex',
  },
  container: {
    flex: 1,
    padding: 20,
  },
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
    backgroundColor: '#FF8F00',
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
  tooltipContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;

{/* <View style={styles.chartContainer}>
<Text style={styles.chartTitle}>Monthly Expense Tracker</Text>
<LineChart
  data={lineChartData}
  width={screenWidth - 40}
  height={220}
  chartConfig={chartConfig}
/>
</View> */}