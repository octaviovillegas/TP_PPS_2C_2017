import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'

import { Profesor } from "../../clases/profesor";

@Injectable()
export class ProfesorServiceProvider {

  private listaMaterias:FirebaseListObservable<any[]>;
  private listaProfesores:FirebaseListObservable<any[]>;

  constructor(private db:AngularFireDatabase, private auth:AngularFireAuth) {

  }


  public traerListadoMaterias():FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('materias') as FirebaseListObservable<any[]>;
    return this.listaMaterias;
  }

  public guardarProfesor(profesor:Profesor){
    profesor.setPerfil('profesor');
    this.db.app.database().ref('/profesores').child(profesor.getDNI()).set(profesor);
    this.db.app.database().ref('/usuarios').child(profesor.getDNI()).push(profesor);
    this.auth.auth.createUserWithEmailAndPassword(profesor.getCorreo(), profesor.getPassword());
  }


  public traerListadoMateriasPorProfesor(dni?:string, materia?:any):FirebaseListObservable<any[]>{
    this.listaMaterias = this.db.list('/profesores', {
      query:{
        orderByChild:'dni',
        equalTo:dni
      }
    }) as FirebaseListObservable<any[]>
    console.log('materias por profesor: ', this.listaMaterias);
    return this.listaMaterias;
  }


  public getMateriasProfesorPorCorreo(id:string){
    let lista:FirebaseListObservable<any[]>;
    let listaMaterias:any[];
    this.db.list('/profesores').subscribe(profesores=>{
      profesores.forEach(profesor => {
        console.log(profesor);
        if (profesor["dni"]==id) {
          listaMaterias = profesor["materias"];
          console.log(listaMaterias);
        }
      });
    });
    console.log(listaMaterias);
    return listaMaterias;
  }

 public getProfesoresLista(){
    this.listaProfesores = this.db.list('/profesores') as FirebaseListObservable<any[]>;
    return this.listaProfesores;
  }

  public borrarProfesor(dni:string){
    this.db.app.database().ref('/profesores/' + dni).remove();
  }

  public modificarProfesor(profesor:Profesor){
    this.db.app.database().ref('/profesores/' + profesor.getDNI()).update(profesor);
  }

  public getDiaSemana():string{
    let diaSemana:string="";
    let diaNumero:number = new Date().getDay();

    switch (diaNumero) {
      case 0:
        diaSemana = "domingo";
      break;
      case 1:
        diaSemana = "lunes";
      break;
      case 2:
        diaSemana = "martes";
      break;
      case 3:
        diaSemana = "miercoles";
      break;
      case 4:
        diaSemana = "jueves";
      break;
      case 5:
        diaSemana = "viernes";
      break;
      case 6:
        diaSemana = "sabado";
      break;
      default:
        break;
    }
    return diaSemana;
  }


  public getProfesoresPorDia(){
    let profesorMateris:Array<string> = new Array<string>();
    let dia:string=this.getDiaSemana();
    console.log(dia);
    this.db.list('/profesores').subscribe(lista=>{
      console.log(lista);
      lista.forEach(profesor => {
        console.log(profesor);
        profesor.materias.forEach(materia => {
          console.log(materia);
          this.db.list('/materias').subscribe(listaMaterias=>{
            listaMaterias.forEach(_materia => {
              console.log(_materia);
              console.log( _materia.turnos.mañana);
              let turnoMañanaStr:string =  _materia.turnos.mañana
              let turnoMañanaArray:string[] = turnoMañanaStr.split(" ");
              let turnoTardeStr:string =  _materia.turnos.tarde
              let turnoTardeArray:string[] = turnoMañanaStr.split(" ");
              turnoMañanaStr = turnoMañanaArray[0].toLowerCase();
              turnoTardeStr = turnoTardeArray[0].toLowerCase();
              console.log(materia);
              console.log(turnoMañanaStr);
              console.log(turnoTardeStr);
              console.log(_materia);
              if ((turnoMañanaStr == dia || turnoTardeStr == dia) && (materia == _materia.nombre)) {
                console.log('siiii');
                console.log(dia);
                console.log(profesor.nombre);
                let obj = {
                  'profesor': profesor.nombre,
                  'materia' : materia
                }
                profesorMateris.push(JSON.stringify(obj));//(profesor.nombre);
                console.log(profesorMateris);

              }
            });
          })
        });

      });
    })
    return profesorMateris;
  }

}
