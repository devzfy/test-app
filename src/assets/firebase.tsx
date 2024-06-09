import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDOBWYLuKLlbzSHbAzY7YEGbPGe1dFmMU0",
  authDomain: "uzchess-8865d.firebaseapp.com",
  projectId: "uzchess-8865d",
  storageBucket: "uzchess-8865d.appspot.com",
  messagingSenderId: "147933130014",
  appId: "1:147933130014:web:aa3c17aca683e53fa56d0f",
  measurementId: "G-BKZ3RD56WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
