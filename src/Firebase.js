 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7R4hiuFw5MJTaVROBpG0BfWLjpxRN-J4",
  authDomain: "fir-react-f997a.firebaseapp.com",
  databaseURL: "https://fir-react-f997a-default-rtdb.firebaseio.com",
  projectId: "fir-react-f997a",
  storageBucket: "fir-react-f997a.appspot.com",
  messagingSenderId: "1058133484232",
  appId: "1:1058133484232:web:633c444174d4d57c4dfbfd",
  measurementId: "G-C5PQ3V7YKV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
