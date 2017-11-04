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
    let datos:{} = JSON.parse(this.navParams.data);
  }

}
