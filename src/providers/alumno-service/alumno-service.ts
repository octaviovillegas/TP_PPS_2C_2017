import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { Alumno } from "../../clases/alumno";


@Injectable()
export class AlumnoServiceProvider {
  private listaMaterias:FirebaseListObservable<any[]>;
  private listaAlumnos:FirebaseListObservable<any[]>;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {

  }

  public traerListadoMaterias():FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('materias') as FirebaseListObservable<any[]>;
    return this.listaMaterias;
  }

  public traerListadoMateriasPorAlumno(legajo:string):FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('/alumnos', {
      query:{
        orderByChild:'legajo',
        equalTo:legajo
      }
    }) as FirebaseListObservable<any[]>
    console.log('materias por alumno: ', this.listaMaterias);
    return this.listaMaterias;
  }

  public guardarAlumno(alumno:Alumno):void{
    alumno.setPerfil('alumno');
    console.log('alumno service: ', alumno);
    //this.db.app.database().ref('/alumnos').child(alumno.getLegajo()).push(alumno);
    this.db.app.database().ref('/alumnos/'+alumno.getLegajo()).set(alumno);
    this.db.app.database().ref('/usuarios').child(alumno.getLegajo()).set(alumno);
    this.auth.auth.createUserWithEmailAndPassword(alumno.getCorreo(), alumno.getPassword());
  }

  public getAlumnosLista(){
    this.listaAlumnos = this.db.list('/alumnos') as FirebaseListObservable<any[]>;
    return this.listaAlumnos;
  }

  public borrarAlumno(legajo:string){
    this.db.app.database().ref('/alumnos/' + legajo).remove();
  }

  public modificarAlumno(alumno:Alumno){
    this.db.app.database().ref('/alumnos/' + alumno.getLegajo()).update(alumno);
  }


}
