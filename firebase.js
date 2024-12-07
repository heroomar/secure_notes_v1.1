// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1zbGBdJUAW0TNgBKVhjOzFXqYMOzMdps",
  authDomain: "notes-328de.firebaseapp.com",
  projectId: "notes-328de",
  storageBucket: "notes-328de.firebasestorage.app",
  messagingSenderId: "330372412162",
  appId: "1:330372412162:web:e6322a696e0b585f19481b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };