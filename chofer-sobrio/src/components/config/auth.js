import { db, firebaseAuth } from './config';

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser).catch(function(error){

    });
  
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
export function verificar(){
  var user = firebaseAuth.auth().currentUser;
  return user.sendEmailVerification().then(function() {
       alert("Correo de verificacion enviado");
      }).catch(function(error) {
       alert("No se pudo enviar el correo de vericacion");
      });
}
export function update_passsword(password_nueva){
  var user = firebaseAuth.auth().currentUser;
  return user.updatePassword(password_nueva).then(() => {
    alert("Se actualizo su contrasena crack maquina fiera tifon");
  }, (error) => {
    alert("No se actualizo su contrasena crack maquina fiera tifon");
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