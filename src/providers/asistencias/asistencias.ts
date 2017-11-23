import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { Alumno } from "../../clases/alumno";

/*
  Generated class for the AsistenciasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AsistenciasProvider {
  private listaMaterias:FirebaseListObservable<any[]>;
  private listaAlumnos:FirebaseListObservable<any[]>;
  
  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {
    
      }

      
  public traerListadoMaterias():FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('materias') as FirebaseListObservable<any[]>;
    return this.listaMaterias;
  }
  public traerAlumnos():FirebaseListObservable<any[]>{
    this.listaAlumnos = this.db.list('alumnos') as FirebaseListObservable<any[]>;
    return this.listaAlumnos;
  }

}
