import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyDRiuM2VIIF2ArMRQ5z0katMiIKadNr_Nc",
    authDomain: "chofer-sobrio-e8e6d.firebaseapp.com",
    databaseURL: "https://chofer-sobrio-e8e6d.firebaseio.com",
    projectId: "chofer-sobrio-e8e6d",
    storageBucket: "chofer-sobrio-e8e6d.appspot.com",
    messagingSenderId: "1024062278941",
    appId: "1:1024062278941:web:954867ff80e30f93"
};
const fire = firebase.initializeApp(config);
export default fire;
