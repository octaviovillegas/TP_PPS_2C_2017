import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { PushService } from "../../services/push.service";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-enviarAviso',
  templateUrl: 'enviarAviso.html',
})
export class EnviarAvisoPage {
  mensaje: string;
  tipo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private pushService: PushService, private auth: AngularFireAuth, private userService: UserService) {
  }

  enviarATodos(): void {
    this.pushService.sendMessageToAll(this.mensaje, this.auth.auth.currentUser.email);
  }
}
