import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-abm-alumno',
  templateUrl: 'abmAlumno.html',
})
export class AbmAlumno {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goAdministrador()
  {
    this.navCtrl.push('AdministradorPage');
  }

}
