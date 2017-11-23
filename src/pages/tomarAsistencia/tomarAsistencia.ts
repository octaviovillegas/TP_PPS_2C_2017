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

  public showCursos: boolean = false;
  public cursos: Observable<any> = this.af.list("/cursos");
  public cursosKeys = new Array<string>();
  public alumnos: Observable<any>;
  public current: {} = {anio: "1", curso: "A"};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase) {
    this.filtrarAlumnos("1", "A");
  }

  public setCursoKey(anio: string, curso: string, key: string): void {
    this.cursosKeys[anio+curso] = key;
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

  public completarCurso(){
    
  }

}
