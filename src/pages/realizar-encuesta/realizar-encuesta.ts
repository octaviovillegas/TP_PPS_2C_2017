
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Encuesta } from '../../services/encuesta.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';


/**
 * Generated class for the RealizarEncuestaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-realizar-encuesta',
  templateUrl: 'realizar-encuesta.html',
})
export class RealizarEncuestaPage {
  unaLista: Array<any> = new Array;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,
      private pictureUtils: Encuesta){
      this.ObtenerLista();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarEncuestaPage');
  }
  ObtenerLista() {
    this.afDB.list('Cuestionarios/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.unaLista[index] = snapshot.val();
      });
    });
  }
  guardarRespuesta(){
    console.log("guardar respuesta");
    alert("respuesta Guardada");
    this.navCtrl.push(BotonesPage);
  }

}
