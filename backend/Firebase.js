import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8EE-OIRL1QBxn64jnwyZYogdCSFhr90A",
  authDomain: "pos-sytem-8adef.firebaseapp.com",
  projectId: "pos-sytem-8adef",
  storageBucket: "pos-sytem-8adef.firebasestorage.app",
  messagingSenderId: "765972628933",
  appId: "1:765972628933:web:5b7ae4baa28c37c129b7ac",
  measurementId: "G-F4B9D8544R"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const analytics = () => getAnalytics(app);

export default app