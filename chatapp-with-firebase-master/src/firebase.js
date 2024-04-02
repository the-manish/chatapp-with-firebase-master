import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB2x7EU0QJec6iP8ZQGDKgby24O1ewnj9k",
  authDomain: "chat-db1e8.firebaseapp.com",
  projectId: "chat-db1e8",
  storageBucket: "chat-db1e8.appspot.com",
  messagingSenderId: "1074873572648",
  appId: "1:1074873572648:web:c2a5c4679066e4fb62841d",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();