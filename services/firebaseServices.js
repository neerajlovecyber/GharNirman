// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };