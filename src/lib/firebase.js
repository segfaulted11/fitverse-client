import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPoAS14h9w6W2hgeNDPNl-TwT7fcLbaok",
  authDomain: "fitverse-b8d94.firebaseapp.com",
  projectId: "fitverse-b8d94",
  storageBucket: "fitverse-b8d94.firebasestorage.app",
  messagingSenderId: "877150252049",
  appId: "1:877150252049:web:0307431250d037e22e95b0"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();