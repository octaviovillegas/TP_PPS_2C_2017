import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

export class CurrentAux {
  constructor(public nombre: any,
  public curso: any,
  public key: any) {

  }
}

@IonicPage()
@Component({
  selector: 'page-listaCurso',
  templateUrl: 'listaCurso.html',
})
export class ListaCursoPage {

  public alumnos: FirebaseListObservable<any[]>;
  public 

  constructor(public navParams: NavParams,
    public af: AngularFireDatabase) {
      let nombre = navParams.get('nombre');
      let curso = navParams.get('curso');
      let key = navParams.get('key');
      this.filterAlumnos(nombre, curso);
  }
  
  private filterAlumnos(nombre: string, curso: string): void {
    this.alumnos = this.af.list("/usuarios").map(usr => usr.filter(usr => {
      if(usr.tipo == "alumno" && usr[nombre] == curso) {
        return true;
      } 
      return false;
    })) as FirebaseListObservable<any[]>;
  }

}
