import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  public cursos: Observable<any>;
  public estado;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase) {
    this.cursos = this.af.list("/cursos");
    console.log(this.cursos);
    this.estado = "cursos";
  }

  public mostrarCurso(anio: number, curso: string): void {
    console.log(anio);
    console.log(curso);
    this.cursoCompleto("Fasd", "fads");
  }

  public cursoCompleto(anio: string, curso: string): boolean {
    let resultado = false;
    console.log(resultado);
    return resultado;
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

}
