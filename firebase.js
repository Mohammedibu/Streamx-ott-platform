import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCa56QNFKmBU2i3_ts8p70XSaM_RJ0dQb0",
  authDomain: "stream-x-c90b0.firebaseapp.com",
  projectId: "stream-x-c90b0",
  storageBucket: "stream-x-c90b0.firebasestorage.app",
  messagingSenderId: "417866644918",
  appId: "1:417866644918:web:db1643b7ebb223d475d517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Account created successfully!");
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
    return res.user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};

const logout = () => {
  signOut(auth);
  toast.info("Logged out");
};

// Function to check if an email exists
const checkIfUserExists = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

export { auth, db, login, signup, logout, checkIfUserExists, fetchSignInMethodsForEmail };