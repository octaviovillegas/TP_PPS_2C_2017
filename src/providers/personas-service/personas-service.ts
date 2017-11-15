import { Injectable } from '@angular/core';


import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { Usuario } from '../../clases/usuario';
import { Imagen } from "../../clases/imagen";


@Injectable()
export class PersonasServiceProvider {

  private usuarios:FirebaseListObservable<Usuario[]>;
  private storageRef: any;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth

  ) { }



  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }

  getUserUID(){
    return this.auth.auth.currentUser.uid;
  }

  guardarUsuario(usuario:Usuario){
    this.auth.auth.createUserWithEmailAndPassword(usuario.getCorreo(), usuario.getClave().toString());
    this.usuarios.push(usuario);
  }

  getDatosPersona(correo:string, perfil:string){
   this.usuarios = this.db.list(this.getPath(perfil), {
      query:{
        orderByChild: "correo",
        equalTo: correo
      }
    }) as FirebaseListObservable<any[]>;
    console.log(this.usuarios);
    return this.usuarios;
  }



  private getPath(perfil:string){
    let path:string="";
    switch (perfil) {
        case "alumno":
          path = "/alumnos";
        break;
        case "administrador":
          path = "administrador";
        break;
        case "administrativo":
          path = "administrativo";
        break;
        case "profesor":
          path = "profesor";
        break;

      default:
        break;
    }
    console.log('path:', path);
    return path;
  }


  guardarLinkFoto(nombre:string, path:string, uid:string){
    let foto = new Imagen();
    foto.setNombre(nombre);
    foto.setFoto(path);

    this.db.app.database().ref('/fotos/'+uid+'/').push(foto);

  }


}
