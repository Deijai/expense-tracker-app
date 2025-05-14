// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBy76pJ4Ql6sHMHpxly6Y7_aIU6y-ENRDw",
  authDomain: "expense-tracker-8ec33.firebaseapp.com",
  projectId: "expense-tracker-8ec33",
  storageBucket: "expense-tracker-8ec33.firebasestorage.app",
  messagingSenderId: "952902969714",
  appId: "1:952902969714:web:5bfb14c6ae4ebc6b5ad5eb",
  measurementId: "G-FE3E9VY3ZC"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;