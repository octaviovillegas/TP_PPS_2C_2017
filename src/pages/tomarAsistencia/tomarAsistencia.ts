import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {
  
  private tab;
  //Materias
  private materiasMartes: FirebaseListObservable<any[]>;
  private materiasViernes: FirebaseListObservable<any[]>;
  private materiasSabado: FirebaseListObservable<any[]>;
  //Buscar
  private searchValue: string;
  public buscarPor: string = "Aula";
  public materiasFiltradas: FirebaseListObservable<any[]> = this.af.list("/materias");
  public profesores: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController) {
      this.tab = "materias";
      this.loadMaterias("Man");
  }

  public loadMaterias(turno: any) {
    this.materiasMartes = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Martes"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;

    this.materiasViernes = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Viernes"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;

    this.materiasSabado = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Sabado"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;
  }

  public selectMateria(nombre: string, curso: string): void {
    this.tab = "materias";
    this.navCtrl.push('ListaCursoPage', {
      nombre: nombre,
      curso: curso
    });
  }

  //Buscar
  public onInput(event: any): void {
    if(this.buscarPor == "Aula"){
      this.filtrarMateriasPorAula();
    } else if (this.buscarPor == "Profesor"){
      this.materiaDeProfe();
    }
  }

  private filtrarMateriasPorAula(): void {
    this.materiasFiltradas = this.materias.map(materia => materia.filter(materia => {
      if(this.searchValue != "" && this.searchValue != undefined) {
        return materia.aula == this.searchValue;
      }
      return true;
    })) as FirebaseListObservable<any[]>;
  }

  private materiaDeProfe(): void {
    this.profesores = this.af.list("/usuarios").map(usuario => usuario.filter(usuario => {
      if(usuario.tipo == "profe") {
        if(this.searchValue != "" && this.searchValue != undefined) {
          return usuario.apellido.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
        }
        return true;
      }
    })) as FirebaseListObservable<any[]>;
  }
}
