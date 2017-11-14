import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PagesService, PageType } from '../../services/pages.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string = "Administrador";
  public pages: Array<any>;
  
  constructor(public navCtrl: NavController) {
    var pagesService = new PagesService();
    this.pages = pagesService.getByUserType(this.user);
    console.log(this.pages);
  }

  public navigate(route: string): void{
    this.navCtrl.push(route + "Page");
  }

  public isListable(type: PageType){
    return type == PageType.Listable;
  }

  public cerrarSesion(): void
  {
    alert('HACER LOGOUT');
  }

}
