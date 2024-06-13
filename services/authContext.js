import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebaseServices';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider,
  
  signInWithCredential
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      console.log('Starting signup...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      console.log('Signup successful:', userCredential.user);
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error; // Propagate error for handling in the component
    }
  };
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSigninButton.hasPlayServices();
      const userInfo = await GoogleSignin.signIn(); // Get user info from Google sign-in
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const { user } = await signInWithCredential(auth, googleCredential);
      setCurrentUser(user);
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      throw error;
    }
  };
 

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
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
