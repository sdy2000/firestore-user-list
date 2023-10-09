import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-AhWnwEMH7nLnIXeiTHD6sHsiortOH5Q",
  authDomain: "fir-project-2aaf0.firebaseapp.com",
  projectId: "fir-project-2aaf0",
  storageBucket: "fir-project-2aaf0.appspot.com",
  messagingSenderId: "866493623459",
  appId: "1:866493623459:web:566f4db3eed198164a2316",
  measurementId: "G-WDKYHEV0Z3",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

export { db };
