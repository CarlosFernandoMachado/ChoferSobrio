import firebase from 'firebase';

// Required for side-effects
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyDRiuM2VIIF2ArMRQ5z0katMiIKadNr_Nc",
    authDomain: "chofer-sobrio-e8e6d.firebaseapp.com",
    databaseURL: "https://chofer-sobrio-e8e6d.firebaseio.com",
    projectId: "chofer-sobrio-e8e6d",
    storageBucket: "chofer-sobrio-e8e6d.appspot.com",
    messagingSenderId: "1024062278941"
};

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default firebase.initializeApp(config);
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const firebaseUI = uiConfig;