import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  navigate(route: string){
    this.navCtrl.push(route + "Page");
  }

  cerrarSesion()
  {
    alert('HACER LOGOUT');
  }

}
