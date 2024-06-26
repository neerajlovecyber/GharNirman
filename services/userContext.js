import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { useAuth } from './authContext';

const UserContext = createContext();
const initialCategories = [
  { id: 1, category: "bricks", total_price: 0, paid: 0, icon: "🔨", color: "#FF5733", transactions: [] },
  { id: 2, category: "cement", total_price: 0, paid: 0, icon: "🏗️", color: "#33FF57", transactions: [] },
  { id: 3, category: "tiles", total_price: 0, paid: 0, icon: "🧱", color: "#3357FF", transactions: [] },
  { id: 4, category: "wood", total_price: 0, paid: 0, icon: "🪵", color: "#FF33A1", transactions: [] },
  { id: 5, category: "paints", total_price: 0, paid: 0, icon: "🎨", color: "#FF9F33", transactions: [] },
  { id: 6, category: "steel", total_price: 0, paid: 0, icon: "⚙️", color: "#33FFF2", transactions: [] },
  { id: 7, category: "glass", total_price: 0, paid: 0, icon: "🪟", color: "#9D33FF", transactions: [] },
  { id: 8, category: "plumbing", total_price: 0, paid: 0, icon: "🚰", color: "#F2FF33", transactions: [] },
  { id: 9, category: "electric", total_price: 0, paid: 0, icon: "🔌", color: "#FF33F2", transactions: [] },
  { id: 10, category: "sand", total_price: 0, paid: 0, icon: "🏖️", color: "#33FFA8", transactions: [] },
];

const initialBudget = 0;

export const UserProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(initialBudget);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [usedBudget, setUsedBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(initialBudget);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  useEffect(() => {
    if (userId) {
      initializeUserData(userId);
    }
  }, [userId]);

  useEffect(() => {
    calculatePaidAndUnpaidAmounts();
  }, [categories]);

  useEffect(() => {
    calculateTotalBudgetSpent();
  }, [categories]);

  useEffect(() => {
    setRemainingBudget(budget - usedBudget);
  }, [budget, usedBudget]);

  const initializeUserData = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, { categories: initialCategories, budget: initialBudget });
        setCategories(initialCategories);
        setBudget(initialBudget);
        setRemainingBudget(initialBudget);
      } else {
        const userData = docSnap.data();
        setCategories(userData.categories || initialCategories);
        setBudget(userData.budget || initialBudget);
        setRemainingBudget((userData.budget || initialBudget) - usedBudget);
      }
    } catch (error) {
      console.error("Error initializing user data:", error);
    }
  };

  const calculateTotalBudgetSpent = () => {
    let spentAmount = 0;
    categories.forEach(category => {
      category.transactions.forEach(transaction => {
        const price = parseFloat(transaction.totalPrice);
        if (!isNaN(price)) {
          spentAmount += price;
        }
      });
    });
    setUsedBudget(spentAmount);
  };

  const calculatePaidAndUnpaidAmounts = () => {
    let paidTotal = 0;
    let unpaidTotal = 0;
    categories.forEach(category => {
      category.transactions.forEach(transaction => {
        const price = parseFloat(transaction.totalPrice);
        if (!isNaN(price)) {
          if (transaction.isPaid) {
            paidTotal += price;
          } else {
            unpaidTotal += price;
          }
        }
      });
    });
    setTotalPaid(paidTotal);
    setTotalUnpaid(unpaidTotal);
  };

  const handleAddExpense = async (expenseData) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedCategories = userData.categories.map(category => {
          if (category.category === expenseData.category) {
            const transaction = {
              description: expenseData.description,
              price: parseFloat(expenseData.price),
              quantity: parseFloat(expenseData.quantity),
              totalPrice: parseFloat(expenseData.totalPrice),
              isPaid: expenseData.isPaid,
              purchaseDate: expenseData.purchaseDate,
            };
            category.transactions.push(transaction);
            if (transaction.isPaid) {
              category.paid += transaction.totalPrice;
            }
            category.total_price += transaction.totalPrice;
          }
          return category;
        });

        await updateDoc(userDocRef, { categories: updatedCategories });
        setCategories(updatedCategories);
      } else {
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleAddCategory = async (categoryData) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newCategory = {
          id: categories.length + 1,
          category: categoryData.name,
          total_price: 0,
          paid: 0,
          icon: categoryData.emoji,
          color: "#000000", // You can assign a default or random color
          transactions: [],
        };
        const updatedCategories = [...userData.categories, newCategory];

        await updateDoc(userDocRef, { categories: updatedCategories });
        setCategories(updatedCategories);
      } else {
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditExpense = async (categoryName, expenseIndex, updatedExpenseData) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedCategories = userData.categories.map(category => {
          if (category.category === categoryName) {
            const transaction = category.transactions[expenseIndex];
            if (transaction) {
              const oldTotalPrice = transaction.totalPrice;
              const newTotalPrice = parseFloat(updatedExpenseData.totalPrice);
              category.transactions[expenseIndex] = {
                ...transaction,
                ...updatedExpenseData,
                totalPrice: newTotalPrice,
              };
              if (transaction.isPaid) {
                category.paid -= oldTotalPrice;
                category.paid += newTotalPrice;
              }
              category.total_price -= oldTotalPrice;
              category.total_price += newTotalPrice;
            }
          }
          return category;
        });

        await updateDoc(userDocRef, { categories: updatedCategories });
        setCategories(updatedCategories);
      } else {
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const handleDeleteExpense = async (categoryName, expenseIndex) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedCategories = userData.categories.map(category => {
          if (category.category === categoryName) {
            const transaction = category.transactions[expenseIndex];
            if (transaction) {
              const totalPrice = transaction.totalPrice;
              category.transactions.splice(expenseIndex, 1);
              if (transaction.isPaid) {
                category.paid -= totalPrice;
              }
              category.total_price -= totalPrice;
            }
          }
          return category;
        });

        await updateDoc(userDocRef, { categories: updatedCategories });
        setCategories(updatedCategories);
      } else {
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <UserContext.Provider value={{ categories, budget, totalPaid, totalUnpaid, setBudget, handleAddExpense, usedBudget, remainingBudget, handleAddCategory, handleEditExpense, handleDeleteExpense }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
