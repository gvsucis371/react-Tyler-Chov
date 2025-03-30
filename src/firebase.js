
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDnnVgpqY39X9i9phMBuzTiJaoHXsskKw",
  authDomain: "moviedatabase-c723b.firebaseapp.com",
  projectId: "moviedatabase-c723b",
  storageBucket: "moviedatabase-c723b.firebasestorage.app",
  messagingSenderId: "774499422726",
  appId: "1:774499422726:web:586646b6c6a68b0866e987"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };