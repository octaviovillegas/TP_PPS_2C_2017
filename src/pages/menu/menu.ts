import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from "../../clases/usuario";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController

  ) {}

  ionViewDidLoad() {
    let datos:Usuario = this.navParams.data;
    let alerta = this.alertCtrl.create({
      subTitle: datos["nombre"],
      title: datos["correo"]
    });
    alerta.present();
  }

}
