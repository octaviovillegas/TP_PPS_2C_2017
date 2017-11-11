import { Component } from '@angular/core';

import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';

/**
 * Generated class for the CrearEncuestaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-crear-encuesta',
  templateUrl: 'crear-encuesta.html',
})
export class CrearEncuestaPage {
  encuesta:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEncuestaPage');
  }
  guardarEncuesta(){
    alert("La encuesta ha sido Guardada");
    console.log(this.encuesta);
    this.navCtrl.push(BotonesPage);

  }

}
