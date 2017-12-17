import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Encuesta } from "../../clases/encuesta";

/*
  Generated class for the EncuestasDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EncuestasDataProvider {

  private listaEncuestas:FirebaseListObservable<any[]>;
  
  
    constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
    }
  
    public borrarEncuesta(codigo:string){
      this.afDB.app.database().ref('/encuestas/' + codigo).remove();
    }
  
    public modificarEncuesta(encuesta:Encuesta){
      this.afDB.app.database().ref('/encuestas/' + encuesta.getCodigo()).update(encuesta);
    }
   
    public guardarEncuesta(_Encuesta:Encuesta):void
    {
      //this.db.app.database().ref('/alumnos').child(alumno.getLegajo()).push(alumno);
      this.afDB.app.database().ref('/encuestas/'+_Encuesta.getCodigo()).set(_Encuesta);
    }
  
    public getEncuestasLista(){
      this.listaEncuestas = this.afDB.list('/encuestas') as FirebaseListObservable<any[]>;
      return this.listaEncuestas;
    }
  
  }
