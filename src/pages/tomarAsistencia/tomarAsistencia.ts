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

  public showCursos: boolean = false;
  public cursos: Observable<any> = this.af.list("/cursos");
  public cursoObj = new Array<any>();
  public alumnos: Observable<any>;
  public current: {} = {anio: "1", curso: "A"};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController) {
    this.filtrarAlumnos("1", "A");
  }

  public setCursoKey(anio: string, curso: string, key: string, listo: string): void {
    this.cursoObj[anio+curso] = {key: key, listo: listo};
  }

  public showHideCursos(): void {
    this.showCursos = !this.showCursos;
  }

  public getTitulo(anio: number) {
    switch(anio){
      case 1:
        return "Primero";
      case 2:
        return "Segundo";
      case 3:
        return "Tercero";
      case 4:
        return "Cuarto";
      case 5:
        return "Quinto";
    }
  }

  public selectCurso(anio: string, curso: string): void {
    this.filtrarAlumnos(anio, curso);
    this.showHideCursos();
    this.current.anio = anio;
    this.current.curso = curso;
  }

  private filtrarAlumnos(anio: string, curso: string): void {
    this.alumnos = this.af.list("/usuarios")
      .map(u => u.filter(u => u.tipo == "alumno" && u.anio == anio && u.curso == curso));
  }

  public setVisibility(presente: string, key: string): void {
    if(presente == "1") {
      document.getElementById(key).style.visibility = "visible";
    }
  }

  public selecAlumno(key: string) {
    if(this.cursoObj[this.current.anio+this.current.curso].listo == "0"){
      let pres = 0;
      if(document.getElementById(key).style.visibility == "hidden"){
        document.getElementById(key).style.visibility = "visible";
        pres = 1;
      } else {
        document.getElementById(key).style.visibility = "hidden";
      }
      this.alumnos.update(key, {
        presente: pres
      });
    }
  }

  public getListo(): string {
    if (this.cursoObj != undefined && this.cursoObj[this.current.anio+this.current.curso] != undefined){
      let listo = this.cursoObj[this.current.anio+this.current.curso].listo;
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

  public completarCurso(anio: string, curso: string){
    let prompt = this.alertCtrl.create({
      title: 'Completar',
      message: "Se completo la toma de lista en este curso?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.cursos.update(this.cursoObj[anio+curso].key, {
            listo: 1
          });
          this.showCursos = true;
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }]
    });
    prompt.present();
  }

  public reabrirCurso(anio: string, curso: string){

    let prompt = this.alertCtrl.create({
      title: 'Reabrir',
      message: "Desea reabrir la toma de lista?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.cursos.update(this.cursoObj[anio+curso].key, {
            listo: 0
          });
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
