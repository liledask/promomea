// This file is no longer used for authentication but is kept for potential future use with other Firebase services.
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "affiliate-ascent-ku4nl",
  appId: "1:432400752881:web:33c2b5f403dbe014814950",
  storageBucket: "affiliate-ascent-ku4nl.appspot.com",
  apiKey: "AIzaSyDcsmAEMwJ8fi73qnSL87oYZsC4vVpUx4U",
  authDomain: "affiliate-ascent-ku4nl.firebaseapp.com",
  messagingSenderId: "432400752881",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
