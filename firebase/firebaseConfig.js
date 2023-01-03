// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANEBbwtBu_ic4YRuV5h9aGgbOer1XnNLo",
  authDomain: "golfr-3c7aa.firebaseapp.com",
  projectId: "golfr-3c7aa",
  storageBucket: "golfr-3c7aa.appspot.com",
  messagingSenderId: "534267170135",
  appId: "1:534267170135:web:5700e94611f84479d68212",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const storage = getStorage(app);
