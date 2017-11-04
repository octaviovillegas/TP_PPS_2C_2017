import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goAdministrador()
  {
    this.navCtrl.push('AdministradorPage');
  }

  cerrarSesion()
  {
    this.navCtrl.push('HomePage');
  }

}
