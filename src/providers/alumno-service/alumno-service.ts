import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { Alumno } from "../../clases/alumno";


@Injectable()
export class AlumnoServiceProvider {
  private listaMaterias:FirebaseListObservable<any[]>;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {

  }

  public traerListadoMaterias():FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('materias') as FirebaseListObservable<any[]>;
    return this.listaMaterias;
  }

  public guardarAlumno(alumno:Alumno):void{
    alumno.setPerfil('alumno');
    console.log('alumno service: ', alumno);
    this.db.app.database().ref('/alumnos').child(alumno.getLegajo()).push(alumno);
    this.db.app.database().ref('/usuarios').child(alumno.getLegajo()).push(alumno);
    this.auth.auth.createUserWithEmailAndPassword(alumno.getCorreo(), alumno.getPassword());
  }





}
