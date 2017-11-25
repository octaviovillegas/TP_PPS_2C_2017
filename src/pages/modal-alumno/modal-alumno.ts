import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Alumno } from '../../app/clases/alumno';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Firebase } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-modal-alumno',
  templateUrl: 'modal-alumno.html',
})
export class ModalAlumnoPage {

alumno:Alumno;
listado:FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afBD : AngularFireDatabase) {

    this.alumno = new Alumno();
  }


  Aceptar(){
    this.listado = this.afBD.list("Alumnos/");
    this.listado.push(this.alumno);

    this.navCtrl.pop();
  }

  Cerrar()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  }

}
