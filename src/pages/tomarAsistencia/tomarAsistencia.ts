import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  public anios: Array<number> = [1, 2, 3, 4, 5];
  public cursos: Array<string> = ['A', 'B'];
  public estado;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireDatabase) {
    this.estado = "cursos";
  }

  public mostrarCurso(anio: number, curso: string): void {
    console.log(anio);
    console.log(curso);
  }

  public estaCompleto(anio: number, curso: string): boolean {
    let estaCompleto = false;
    this.af.list("/cursos").forEach( c => {
      console.log(c);
      /*if(c.anio == anio && c.curso == curso && c.listo == 1){
        estaCompleto == true;
      }*/
    })
    return estaCompleto;
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
