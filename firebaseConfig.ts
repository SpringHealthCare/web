import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBcj9GVhhC5nMSRNGJFmW8zRxwb3whh0ic",
  authDomain: "spring-health-644db.firebaseapp.com",
  projectId: "spring-health-644db",
  storageBucket: "spring-health-644db.firebasestorage.app",
  messagingSenderId: "283381471148",
  appId: "1:283381471148:web:09e5e835ac597ee4650c09",
  measurementId: "G-56WF5KZR1J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

// Initialize other Firebase services
const database = getDatabase(app);

// Set up authentication providers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, database, googleProvider, microsoftProvider,getDatabase,app };
