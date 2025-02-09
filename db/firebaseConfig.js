// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZ2uVVHHJOEdJHH_MORFKevYVg7ifylvI",
    authDomain: "kleptovintage-store.firebaseapp.com",
    projectId: "kleptovintage-store",
    storageBucket: "kleptovintage-store.firebasestorage.app",
    messagingSenderId: "229370770815",
    appId: "1:229370770815:web:50e35505cee13574e2d64a",
    measurementId: "G-WG9TMT63GB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
