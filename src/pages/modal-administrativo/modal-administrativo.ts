import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Administrativo } from '../../app/clases/administrativo';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ModalAdministrativoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-administrativo',
  templateUrl: 'modal-administrativo.html',
})
export class ModalAdministrativoPage {

  administrativo : Administrativo;
  listado:FirebaseListObservable<any>;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private afDB : AngularFireDatabase) {
  
      this.administrativo = new Administrativo();
    
    }
  
  
    Aceptar(){
      this.listado = this.afDB.list("Administrativos/");
      this.listado.push(this.administrativo);
  
      this.navCtrl.pop();
    }

    Cerrar()
    {
      this.navCtrl.pop();
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAdministrativoPage');
  }

}
