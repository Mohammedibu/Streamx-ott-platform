
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyCca3ddoFqScl9HkgFWxzF_piH3nuOFjQw",
  authDomain: "netflix-clone-b0336.firebaseapp.com",
  projectId: "netflix-clone-b0336",
  storageBucket: "netflix-clone-b0336.firebasestorage.app",
  messagingSenderId: "761063596377",
  appId: "1:761063596377:web:c031ac2ef04e05a61c2c48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid:user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/') [1] .split('-').join(" "));
    
  }

}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/') [1] .split('-').join("  "));
    
    
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth, db, login, signup, logout}
