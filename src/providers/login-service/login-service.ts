import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';
import firebase from "firebase";


@Injectable()
export class LoginServiceProvider {

  constructor(private auth:AngularFireAuth, private db: AngularFireDatabase

  ) {}

  private provider = {
    mail: '',
    nombre:'',
    foto:'',
    loggedin:false
  }


  loginUser(correo: string, clave: string) {
    return this.auth.auth.signInWithEmailAndPassword(correo, clave)
      .then(user => {

      })
      .catch(err => Promise.reject(err=>{console.log(err)}))

  }

  public loginGitHub():any{
    let proveedor = new firebase.auth.GithubAuthProvider();

    this.auth.auth.signInWithRedirect(proveedor).then(res =>{
      console.log('res: '+ JSON.stringify(res));
      /*this.provider.loggedin = true;
      this.provider.mail = res.user.email;
      this.provider.foto = res.user.photoURL;
      this.provider.nombre = res.user.displayName;*/
      return this.provider;
    });

  }


  public logOut() {
    this.auth.auth.signOut();
    this.provider.loggedin = false;
  }



}
