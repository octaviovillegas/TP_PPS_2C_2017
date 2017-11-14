import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adminUsuarios',
  templateUrl: 'adminUsuarios.html',
})
export class AdminUsuariosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsuariosPage');
  }

  goAbmAlumno()
  {
    this.navCtrl.push('AbmAlumnoPage');
  }

  goAbmProfesor()
  {
    this.navCtrl.push('AbmProfesorPage');
  }

}
