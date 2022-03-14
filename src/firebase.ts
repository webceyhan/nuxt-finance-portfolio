// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const env = import.meta.env;

console.log(env);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
} as any;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
