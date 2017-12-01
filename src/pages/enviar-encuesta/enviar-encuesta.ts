import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EnviarEncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enviar-encuesta',
  templateUrl: 'enviar-encuesta.html',
})
export class EnviarEncuestaPage {
  destinatarios: {};
  encuesta = { respondida: false, enviada: false, destinatarios: {}};
  inhabilitar = true;
  listExcel =[];
  userLogeado = {};
  modificar = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public viewCtrl: ViewController,
    public afDB: AngularFireDatabase,
     public alertCtrl: AlertController
   /*  public eDataProvider: EncuestaDataProvider*/,
    public storage: Storage, public afAuth: AngularFireAuth,
   /*  public asisProvider: AsistenciDataProvider*/) {
     
  }

  ionViewDidLoad() {
    this.modificar = this.navParams.get('modificar');
    console.log(this.modificar);
    this.encuesta = this.navParams.get('encuesta');
    if(this.modificar){
      this.destinatarios = this.encuesta.destinatarios;
    }
    this.userLogeado = this.getUser();    
  /*  this.asisProvider.getListaAlumnosExcel().subscribe(res=>{
      this.listExcel = res;
    });*/
  } 

  getUser() {
    return this.afAuth.auth.currentUser.email;
  } 

  siguiente() {
    this.encuesta.destinatarios = this.destinatarios;
    var jsonEncuesta = { encuesta: this.encuesta , modificar: this.modificar };
   // this.navCtrl.push(EncuestaDetallePage, jsonEncuesta);
  }

  verificarDestinatarios(): boolean {
    if (this.destinatarios != undefined) {
      this.inhabilitar = false;
      return false;
    }
    return true;
  }
}
