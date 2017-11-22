import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tomarAsistencia',
  templateUrl: 'tomarAsistencia.html',
})
export class TomarAsistenciaPage {

  public estado;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.estado == "cursos";
  }
}
