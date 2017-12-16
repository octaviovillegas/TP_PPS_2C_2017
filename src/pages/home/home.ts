import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PagesService, PageType } from '../../services/pages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { NativeAudio } from '@ionic-native/native-audio';
import { PushService } from '../../services/push.service';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usera: any;
  user: string = "Administrador";
  public pages: Array<any>;

  constructor(public navCtrl: NavController,
    public authAf: AngularFireAuth,
    private alertCtrl: AlertController,
    private nativeAudio: NativeAudio,
    public af: AngularFireDatabase,
    private platform: Platform,
    private pushService: PushService,
    private pagesService: PagesService) {
    af.database.ref("/usuarios/").on('value', usuarios => {
        let props = Object.getOwnPropertyNames(usuarios.val());
        props.forEach(p => {
            let usr = usuarios.val()[p];
            if(usr.email == this.authAf.auth.currentUser.email){
              this.pages = pagesService.getByUserType(usr.tipo);
            }
        });
    });
    this.pushService.getPermission(this.platform);
    this.pushService.receiveMessage(this.platform);
  }

  public navigate(route: string): void {
    this.navCtrl.push(route + "Page");
  }

  public isListable(type: PageType) {
    return type == PageType.Listable;
  }

  public cerrarSesion(): void {
    this.nativeAudio.play('assets/sounds/sonido.mp3');
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