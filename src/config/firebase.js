import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: 'AIzaSyD10bQj-Djf912Iw_t432cDbiM8TRNiJoE',
    authDomain: 'tiktok-e714c.firebaseapp.com',
    projectId: 'tiktok-e714c',
    storageBucket: 'tiktok-e714c.appspot.com',
    messagingSenderId: '382522168072',
    appId: '1:382522168072:web:fc67a1735901258f9292bd',
    measurementId: 'G-9PM1FXGQM2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
