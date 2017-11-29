import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

export class CurrentAux {
  constructor(public nombre: any,
  public curso: any) {

  }
}

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  private tab: string;
  //Materias
  public showMaterias: boolean = false;
  public materias: FirebaseListObservable<any[]> = this.af.list("/materias");
  public materiaObj = new Array<any>();
  public alumnos: FirebaseListObservable<any[]>;
  public current: CurrentAux = new CurrentAux("Programacion", "A");
  //Buscar
  private searchValue: string;
  public buscarPor: string = "Aula";
  public materiasFiltradas: FirebaseListObservable<any[]> = this.af.list("/materias");
  public profesores: FirebaseListObservable<any[]>;
  public usuarios: FirebaseListObservable<any[]> = this.af.list("/usuarios");

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController) {
    this.tab = "materias";
    this.filtrarAlumnos("Programacion", "A");
    this.materiaDeProfe();
  }

  public setMateriaKey(nombre: string, curso: string, key: string, listo: string): void {
    this.materiaObj[nombre+curso] = {key: key, listo: listo};
  }

  public showHideMaterias(): void {
    this.showMaterias = !this.showMaterias;
  }

  public selectMateria(nombre: string, curso: string): void {
    this.tab = "materias";
    this.filtrarAlumnos(nombre, curso);
    this.showMaterias = false;
    this.current.nombre = nombre;
    this.current.curso = curso;
  }

  private filtrarAlumnos(nombre: string, curso: string): void {
    this.alumnos = this.usuarios.map(u => u.filter(u => u.tipo == "alumno" && u[nombre] == curso)) as FirebaseListObservable<any[]>;
  }

  public setVisibility(alumno: any, key: string): void {
    let presente = alumno["pres_" + this.current.nombre];
    if(presente == "1") {
      document.getElementById(key).style.visibility = "visible";
    }
  }

  public selecAlumno(key: string) {
    if(this.materiaObj[this.current.nombre+this.current.curso].listo == "0"){
      let pres = 0;
      if(document.getElementById(key).style.visibility == "hidden"){
        document.getElementById(key).style.visibility = "visible";
        pres = 1;
      } else {
        document.getElementById(key).style.visibility = "hidden";
      }
      this.alumnos.update(key, {
        ["pres_" + this.current.nombre]: pres
      });
    }
  }

  public getListo(): string {
    if (this.materiaObj != undefined && this.materiaObj[this.current.nombre+this.current.curso] != undefined){
      let listo = this.materiaObj[this.current.nombre+this.current.curso].listo;
      let array = document.getElementsByClassName("item-alumno");
      if(listo == "1"){
        for (let i = 0; i < array.length; i++) {
          array[i].className = "item-alumno card card-ios disabled";
        }
      } else {
        for (let i = 0; i < array.length; i++) {
          array[i].className = "item-alumno card card-ios";
        }
      }
      return listo;
    }
    else  
    {
      return "3";
    }
  }

  public completarMateria(nombre: string, curso: string){
    let prompt = this.alertCtrl.create({
      title: 'Completar',
      message: "¿Terminaste de tomar lista?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.materias.update(this.materiaObj[nombre+curso].key, {
            listo: 1
          });
          this.showMaterias = true;
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }]
    });
    prompt.present();
  }

  public reabrirMateria(nombre: string, curso: string){

    let prompt = this.alertCtrl.create({
      title: 'Reabrir',
      message: "¿Queres reabrir la materia?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.materias.update(this.materiaObj[nombre+curso].key, {
            listo: 0
          });
          this.showMaterias = false;
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }]
    });
    prompt.present();
  }

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
    this.profesores = this.usuarios.map(usuario => usuario.filter(usuario => {
      if(usuario.tipo == "profe") {
        if(this.searchValue != "" && this.searchValue != undefined) {
          return usuario.apellido.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
        }
        return true;
      }
    })) as FirebaseListObservable<any[]>;
  }

}
