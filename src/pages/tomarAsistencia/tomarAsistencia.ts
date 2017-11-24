import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  public showMaterias: boolean = false;
  public materias: Observable<any> = this.af.list("/materias");
  public materiaObj = new Array<any>();
  public alumnos: Observable<any>;
  public current: {} = {nombre: "Programacion", curso: "A"};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController) {
    this.filtrarAlumnos("Programacion", "A");
  }

  public setMateriaKey(nombre: string, curso: string, key: string, listo: string): void {
    this.materiaObj[nombre+curso] = {key: key, listo: listo};
  }

  public showHideMaterias(): void {
    this.showMaterias = !this.showMaterias;
  }

  public selectMateria(nombre: string, curso: string): void {
    this.filtrarAlumnos(nombre, curso);
    this.showHideMaterias();
    this.current.nombre = nombre;
    this.current.curso = curso;
  }

  private filtrarAlumnos(nombre: string, curso: string): void {
    this.alumnos = this.af.list("/usuarios")
      .map(u => u.filter(u => u.tipo == "alumno" && u[nombre] == curso));
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
      message: "Se completo la toma de lista en este curso?",
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
      message: "Desea reabrir la toma de lista?",
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
}
