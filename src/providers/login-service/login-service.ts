import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginServiceProvider {

  constructor(private auth:AngularFireAuth, private db: AngularFireDatabase


  ) {}



  loginUser(correo: string, clave: string) {
    return this.auth.auth.signInWithEmailAndPassword(correo, clave)
      .then(user => {

      })
      .catch(err => Promise.reject(err=>{console.log(err)}))

  }


  public logOut() {
    this.auth.auth.signOut();

  }



}
