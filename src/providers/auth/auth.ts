
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth :  AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

    // Registro de usuario
  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
      .then((res)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    })
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
 }
  // Obtenemos el id de usuario.
  getUser(){
    return this.afAuth.auth.currentUser.email;
   // return this.afAuth.auth.currentUser.uid;
  }
 // Login de usuario
 loginUser(email:string, password:string){
   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then(user=>Promise.resolve(user))
     .catch(err=>Promise.reject(err))
 }

 // Logout de usuario
 logout(){
   this.afAuth.auth.signOut().then(()=>{
     // hemos salido
   })
 }

// Devuelve la session
 get Session(){
  return this.afAuth.authState;
 }

}