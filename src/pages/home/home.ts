import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetPagesService, PageType } from '../../services/getPagesService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string = "Administrador";
  public pages: Array<any>;

  constructor(public navCtrl: NavController) {
    this.pages = GetPagesService.getAllPagesByUserType(this.user);
  }

  public navigate(route: string): void{
    this.navCtrl.push(route + "Page");
  }

  public cerrarSesion(): void
  {
    alert('HACER LOGOUT');
  }

}
