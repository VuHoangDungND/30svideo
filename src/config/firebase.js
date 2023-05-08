// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD10bQj-Djf912Iw_t432cDbiM8TRNiJoE',
    authDomain: 'tiktok-e714c.firebaseapp.com',
    projectId: 'tiktok-e714c',
    storageBucket: 'tiktok-e714c.appspot.com',
    messagingSenderId: '382522168072',
    appId: '1:382522168072:web:fc67a1735901258f9292bd',
    measurementId: 'G-9PM1FXGQM2',
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
