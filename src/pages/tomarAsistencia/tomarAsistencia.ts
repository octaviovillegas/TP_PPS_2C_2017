import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  public alumnos: FirebaseListObservable<any[]>;
  public showAlumno: Array<boolean> = new Array<boolean>();
  public lastEmail: string;
  public lastEmailValue: boolean;
  //Estadisticas
  private materiasCargadas = new Array<string>();
  private presentes: number = 0;
  private ausentes: number = 0;
  @ViewChild('barrasCanvas') barrasCanvas;
  public barrasGrafico: any;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController) {
      this.tab = "materias";
      this.loadMaterias("Man");
      this.alumnos = this.af.list("/usuarios").map(usr => usr.filter(usr => {
        if(usr.tipo = "alumno"){
          return true;
        }
      })) as FirebaseListObservable<any[]>;
  }

  public loadMaterias(turno: any): void {
    this.materiasCargadas = new Array<string>();
    this.presentes = 0;
    this.ausentes = 0;
    console.log("------------------");
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

  public selectMateria(nombre: string, turno: string, dia: string): void {
    this.tab = "materias";
    this.navCtrl.push('ListaCursoPage', {
      nombre: nombre,
      turno: turno,
      dia: dia
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
    this.materiasFiltradas = this.af.list("/materias").map(materia => materia.filter(materia => {
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

  public initShowAlumno(email: string): void {
    let limpio = this.emailSinArroba(email);
    this.showAlumno[limpio] = false;
    setTimeout(() => {}, 300);
  }

  public showHideAlumno(email: string): void {
      let limpio = this.emailSinArroba(email);
      let lastEmail = this.lastEmail;
      let lastEmailValue = this.lastEmailValue;
      this.lastEmail = limpio;
      this.lastEmailValue = !this.showAlumno[limpio];
      this.showAlumno[limpio] = !this.showAlumno[limpio];
      if(limpio == lastEmail && lastEmailValue) {
        this.showAlumno[limpio] = false;
        this.lastEmailValue = false;
      }
  }

  public emailSinArroba(email: string): string {
    let array = email.split('@');
    let retorno: string = "";
    array.forEach(c => {
      retorno += c;
    });
    return retorno;
  }  

  public cargarAsistencias(materia: any): void {
    if(this.materiasCargadas.indexOf(materia.nombre+materia.turno) == -1){
      if(materia["presentes"] != undefined) {
        this.presentes += (materia["presentes"] as number);
      }
      if(materia["ausentes"] != undefined) {
        this.ausentes += (materia["ausentes"] as number);
      }
      this.materiasCargadas.push(materia.nombre+materia.turno);
      console.log(this.presentes);
      console.log(this.ausentes);
    }
  }

  public loadEstadisticas(): void {

  }

}
