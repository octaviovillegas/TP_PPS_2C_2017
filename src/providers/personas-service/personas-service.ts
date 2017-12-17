import { Injectable } from '@angular/core';


import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { AlertController } from "ionic-angular";

import { Usuario } from '../../clases/usuario';
import { Imagen } from "../../clases/imagen";


@Injectable()
export class PersonasServiceProvider {

  private usuarios:FirebaseListObservable<Usuario[]>;
  private storageRef: any;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth,
              public alertCtrl:AlertController

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
    //console.log(this.usuarios);
    return this.usuarios;
  }



  private getPath(perfil:string){
    let path:string="";
    switch (perfil) {
        case "alumno":
          path = "/alumnos";
        break;
        case "administrador":
          path = "/administradores";
        break;
        case "administrativo":
          path = "/administrativos";
        break;
        case "profesor":
          path = "/profesores";
        break;

      default:
        break;
    }

    return path;
  }


  guardarLinkFoto(path:string, legajo:string, perfil:string, fotos:string[]){
    let ruta:string = this.getPath(perfil) + '/' + legajo;
    this.db.app.database().ref(ruta).update({'fotos':fotos});
  }

  public actualizarFotoPerfil(legajo:string, perfil:string, fotos:string[]){
    let ruta:string = this.getPath(perfil) + '/' + legajo;
    this.db.app.database().ref(ruta).update({fotos});
  }


  public cambiarEmail(correo:string, perfil:string, legajo:string){
    let correoAntes:string = this.auth.auth.currentUser.email;
    this.usuarios = this.getUsuariosLista();
    this.usuarios.subscribe(user=>{
        user.forEach(usuario => {
          if (usuario["correo"] == correoAntes) {
            this.db.app.database().ref('/usuarios/'+ 2).update({"correo": correo});
          }
        });

    this.db.app.database().ref(perfil + '/' + legajo).update({"correo": correo});
    this.auth.auth.currentUser.updateEmail(correo);
    });


  }



}
