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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase) {
      this.estado = "lista";
    this.cursos = this.af.list("/cursos");
    this.alumnos = this.af.list("/usuarios").map(u => u.filter(u => u.tipo == "alumno"));
  }

  public mostrarCurso(anio: number, curso: string): void {
    
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

  public selecAlumno(key: string) {
    if(document.getElementById(key).style.visibility == "hidden"){
      document.getElementById(key).style.visibility = "visible";
    } else {
      document.getElementById(key).style.visibility = "hidden";
    }
  }

}
