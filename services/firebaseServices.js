// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';  // Import Realtime Database
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfig = {
    apiKey: "AIzaSyCSA0KG3w8gwF4soQ_0MSeaTi6RijU6dXQ",
    authDomain: "ghar-nirmaan.firebaseapp.com",
    databaseURL: "https://ghar-nirmaan-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ghar-nirmaan",
    storageBucket: "ghar-nirmaan.appspot.com",
    messagingSenderId: "16203403763",
    appId: "1:16203403763:web:76f745cd0b417fd3798286",
    measurementId: "G-L057RN2KPP"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const realtimeDb = getDatabase(app);  // Initialize Realtime Database

export { auth, db, realtimeDb };
