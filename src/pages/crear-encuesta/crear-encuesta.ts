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
  opcion:string;
  pregunta:string;
  titulo:string;
  mostrarForm:boolean;
  Unalista:FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDB: AngularFireDatabase) {
    this.mostrarForm=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEncuestaPage');
  }
  guardarEncuesta(){
    alert("La encuesta ha sido Guardada");
    console.log(this.encuesta);
    this.navCtrl.push(BotonesPage);

  }
  continuar(){
    this.mostrarForm=false;
  }
  opcionSeleccionada(c:string){
    this.opcion=c;
    console.log(this.encuesta);
    console.log(this.pregunta);
    console.log(this.opcion);

    this.Unalista=this.afDB.list('Cuestionarios');
    this.Unalista.push({titulo:this.encuesta,pregunta:this.pregunta,opcion:this.opcion});
   // this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado+'/total');
    //this.Unalista.push(1);
    alert("La encuesta ha sido Guardada");
    console.log(this.encuesta);
    this.navCtrl.push(BotonesPage);


  }

}
