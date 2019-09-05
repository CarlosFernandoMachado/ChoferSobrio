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


export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token de usuario:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.OAuthProvider('microsoft.com')
  ],
};


export default firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BIOAOeRSI2kDyuxkRw3tG87VEylcQb20wG-gDwYn1QKMJHDXJbHe8-uj5LPCqNBVzcRJ-bGKhEGpGbEgYzlDro4");
export {messaging};
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const firebaseUI = uiConfig;