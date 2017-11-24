import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PagesService, PageType } from '../../services/pages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
//import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string = "Administrador";
  public pages: Array<any>;
  
  constructor(public navCtrl: NavController,
    public authAf: AngularFireAuth,
    private alertCtrl: AlertController,
	  /*private socketService: SocketService*/) {    var pagesService = new PagesService();
    this.pages = pagesService.getByUserType(this.user);
  }

  public navigate(route: string): void{
    this.navCtrl.push(route + "Page");
  }

  public isListable(type: PageType){
    return type == PageType.Listable;
  }

  public cerrarSesion(): void
  {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Desea cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.authAf.auth.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}
