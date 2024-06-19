import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView, Dimensions, Image } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'; // Ensure these imports are correct
import * as Progress from 'react-native-progress';
import CategoriesCard from '../../Components/CategoriesCard';
import { useAuth } from "../../services/authContext"
import AddComponent from '../../Components/AddComponent';

const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [isAddComponentVisible, setAddComponentVisible] = useState(false);

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
  const handleAddExpense = (expenseData) => {
    console.log(expenseData);
    setAddComponentVisible(false); // Close the add component modal
  };

  const currentUser = useAuth();
  console.log(currentUser);
  const displayName = currentUser.currentUser?.displayName ? currentUser.currentUser.displayName.slice(0, 10) : '';

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
          <View className='w-1/2'>
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
              <Text className='text-xs text-black font-semibold'>{amount === 0 ? 'Add amount' : 'Edit amount'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card} className='h-25 p-5 w-full flex-column justify-between items-center'>
          <View className='flex-row'>
            <View className='w-1/2'>
              <Text className='text-l text-gray-500 text-semibold font-pregular'>Paid Amount</Text>
              <Text className='font-psemibold'>{amount} {amount === 0 ? '' : 'INR'}</Text>
            </View>
            <View className='w-1/2'>
              <Text className='text-l text-gray-500 text-semibold font-pregular pl-7'>Unpaid Amount</Text>
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
          <CategoriesCard />
        </View>

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

      {/* Fixed Add Button */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => setAddComponentVisible(true)}
      >
        <Text style={styles.fixedButtonText}>+</Text>
      </TouchableOpacity>

      {/* Floating Add Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddComponentVisible}
        onRequestClose={() => setAddComponentVisible(false)}
      >
        <View style={styles.addComponentContainer}>
        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setAddComponentVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <AddComponent onClose={() => setAddComponentVisible(false)} onSubmit={handleAddExpense} />
        </View>
      </Modal>
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
  fixedButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#FF8F00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fixedButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  addComponentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '65%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 15,
    zIndex: 1,
    width: 40,
    height: 40,
    backgroundColor: '#FF8F00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    color:'#fff'
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight:'bold',
    color: '#fff',
  },
});

export default Home;
