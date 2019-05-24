import { db, firebaseAuth } from './config';

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  
  return firebaseAuth().sendPasswordResetEmail(email);
}
export function correo_verificacion(email){
  var user = firebaseAuth.auth().currentUser;
  return user.sendEmailVerification().then(function() {
       // Email sent.
      }).catch(function(error) {
      // An error happened.
      });
}

export function saveUser(user) {
  return db
    .collection(`users`)
    .add({
      email: user.email,
      uid: user.uid
    })
    .then(docRef => docRef)
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}