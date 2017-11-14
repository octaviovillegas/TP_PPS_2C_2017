import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  goAbmAlumno()
  {
    this.navCtrl.push('AbmAlumnoPage');
  }

  goAbmProfesor()
  {
    this.navCtrl.push('AbmProfesorPage');
  }*/

}
