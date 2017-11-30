import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,ViewController } from 'ionic-angular';
//import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated"
import { AngularFireAuth } from 'angularfire2/auth';
import { EnviarEncuestaPage } from '../enviar-encuesta/enviar-encuesta';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Encuesta } from "../../clases/encuesta";
import { Alumno } from "../../clases/alumno";

/**
 * Generated class for the Encuesta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {

 
    private encuesta:any;
    private nombre:string="";


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public afDB: AngularFireDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public modalCtrl: ModalController,
    public eDataProvider: EncuestasDataProvider, 
    public formBuilder: FormBuilder, public datePipeCtrl: DatePipe,public view:ViewController)
     {

  }
 

  eliminar(){
    let modalAlumno = this.modalCtrl.create('EnviarEncuestaPage', {'encuesta':this.encuesta, 'boolDatos':true});
    modalAlumno.present();
    
  }

  modificar(){
    console.log('modificar', this.encuesta);
    let modalAlumno = this.modalCtrl.create('EnviarEncuestaPage', {'encuesta':this.encuesta, 'boolDatos':false});
    modalAlumno.present();
  }

  cancelarOpe(){
    this.view.dismiss();
  }


}