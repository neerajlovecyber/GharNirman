import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebaseServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserCredentials = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user credentials:', error);
    }
  };

  const getUserCredentials = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error retrieving user credentials:', error);
      return null;
    }
  };

  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setCurrentUser(userCredential.user);
      await saveUserCredentials(userCredential.user);
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      await saveUserCredentials(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSigninButton.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const { user } = await signInWithCredential(auth, googleCredential);
      setCurrentUser(user);
      await saveUserCredentials(user);
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {
      const savedUser = await getUserCredentials();
      if (savedUser) {
        setCurrentUser(savedUser);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    checkAuthState();
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};