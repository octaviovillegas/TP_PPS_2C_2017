import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  public estado;
  public cursos: Observable<any>;
  public alumnos: Observable<any>;
  public current: {} = {anio: null, curso: null};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase) {
      this.estado = "cursos";
    this.cursos = this.af.list("/cursos");
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

  public mostrarLista(anio: string, curso: string): void {
    console.log(anio);
    console.log(curso);
    this.filtrarAlumnos(anio, curso);
    this.current.anio = anio;
    this.current.curso = curso;
    this.estado = "lista";
  }

  private filtrarAlumnos(anio?: string, curso?: string): void {
    this.alumnos = this.af.list("/usuarios").map(u => 
      u.filter(u => u.tipo == "alumno").filter(u => u.anio == anio && u.curso == curso);
    );
  }

  public backToCursos(): void {
    this.estado = "cursos";
  }

  public selecAlumno(key: string) {
    if(document.getElementById(key).style.visibility == "hidden"){
      document.getElementById(key).style.visibility = "visible";
    } else {
      document.getElementById(key).style.visibility = "hidden";
    }
  }

}
