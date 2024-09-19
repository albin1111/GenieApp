import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA99BFwx-GH1Pi_oYrCKwmBJkdRirLGOAE",
  authDomain: "genieapp-8bf5d.firebaseapp.com",
  projectId: "genieapp-8bf5d",
  storageBucket: "genieapp-8bf5d.appspot.com",
  messagingSenderId: "273794158776",
  appId: "1:273794158776:web:c392764538c4573850e44d",
  measurementId: "G-H806Y800P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const wishesRef = collection(db, 'wishes');

export const storageFb = getStorage(app);