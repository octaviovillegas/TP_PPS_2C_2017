import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profesor } from '../../app/clases/profesor';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ModalProfesorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-profesor',
  templateUrl: 'modal-profesor.html',
})
export class ModalProfesorPage {

profesor : Profesor;
listado:FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB : AngularFireDatabase) {

    this.profesor = new Profesor();
    this.profesor.materias = new Array<string>();
  }


  Aceptar(){
    this.listado = this.afDB.list("Profesores/");
    this.listado.push(this.profesor);

    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProfesorPage');
  }

}
