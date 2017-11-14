import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pages: Array<any>;

  constructor(public navCtrl: NavController) {
    
  }

  public navigate(route: string): void{
    this.navCtrl.push(route + "Page");
  }

  public cerrarSesion(): void
  {
    alert('HACER LOGOUT');
  }

}
