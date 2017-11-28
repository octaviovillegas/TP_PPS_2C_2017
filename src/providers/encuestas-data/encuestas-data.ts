import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the EncuestasDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EncuestasDataProvider {
  
    constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
    }
  
    getEncuestas(){
      return this.afDB.list('Encuestas/');
    }
  
    saveEncuestaInFB(encuesta){
    //  return this.afDB.database.ref('Encuestas/').push(encuesta);
    return this.afDB.app.database().ref('/Encuestas/').set(encuesta);
      
    }
  
    enviarEncuestaGuardadaFB(encuesta){
      return firebase.database().ref('Encuestas/' + encuesta.$key).update(encuesta);
    } 
    
    eliminarEncuesta(encuesta){
      return this.afDB.database.ref('Encuestas/'+encuesta.$key).remove();
    }
  
    getProfesorMateria(){
      return this.afDB.list('ProfesorMateria/');
    }
  
    enviarEncuestaRespuesta(respuesta){
      return this.afDB.database.ref('EncuestaRespuesta/').push(respuesta);
    }
  
    getEncuesta(key){
      return this.afDB.list('Encuestas/'+key);
    }
  
    getEncuestaRespuesta(encuestaKey){
      return this.afDB.list('EncuestaRespuesta/',{
        query: {
          orderByChild: 'encuestaKey',
          equalTo: encuestaKey
        }
      })
    }
  
    enviarEncuestaMateria(encuesta,materias){
      return this.afDB.database.ref('EncuestaMateria/'+encuesta.$key).push(materias);
    }
  
    getMateriaAlumnos(){
      return this.afDB.list('MateriasAlumnos/');
    }
  
    actualizarEncuestaPorRespuesta(encuesta,key){
      return firebase.database().ref('Encuestas/' + key).update({respondida: true});
    } 
  
    getListaMatExcel(){
      return this.afDB.list('listas/');
    }
  }
