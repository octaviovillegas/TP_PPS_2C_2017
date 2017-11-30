import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
//import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated"
import { AngularFireAuth } from 'angularfire2/auth';
import { EnviarEncuestaPage } from '../enviar-encuesta/enviar-encuesta';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Encuesta } from "../../clases/encuesta";
import { EncuestasHomePage } from '../encuestas-home/encuestas-home';
import { Alumno } from "../../clases/alumno";


import { Camera, CameraOptions } from "@ionic-native/camera";


import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';


/**
 * Generated class for the EncuestaDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-det',
  templateUrl: 'encuesta-det.html',
})
export class EncuestaDetPage {
  private codigo:string;
  private pregunta:string;
  private opcion1:string;
  private opcion2:string;
  private opcion3:string;
  private encuesta:Encuesta;
  private fechaE:string;
  private fechaI:string;
  private numero;
  
  private alumno:Alumno;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public afDB: AngularFireDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public modalCtrl: ModalController,
    public eDataProvider: EncuestasDataProvider, 
    public formBuilder: FormBuilder, public datePipeCtrl: DatePipe) {
    this.fechaI = this.datePipeCtrl.transform(Date.now(), 'yyyy-MM-dd');
    this.fechaE="s";



    /*this.seModifica = this.navParams.get('data');
    if (this.seModifica) {
      this.encuesta = this.seModifica;
      this.modificar = true;
    }*/
  }

  ingresarEncuesta(){
    /*console.log('alumno form: ', this.codigo);
    
    console.log('alumno form: ', this.fechaE);
    console.log('alumno form: ', this.fechaI);
    console.log('alumno form: ', this.pregunta);
    console.log('alumno form: ', this.opcion1);
    console.log('alumno form: ', this.opcion2);
    console.log('alumno form: ', this.opcion3);
    console.log('alumno form: ', this.encuesta); */
    this.encuesta.setCodigo(this.codigo);
    this.encuesta.setfechaE(this.fechaE);
    this.encuesta.setfechaI(this.fechaI);
    this.encuesta.setPregunta(this.pregunta);
    this.encuesta.setOpcion1(this.opcion1);
    this.encuesta.setOpcion2(this.opcion2);
    this.encuesta.setOpcion3(this.opcion3);

    this.eDataProvider.guardarEncuesta(this.encuesta);
    this.navCtrl.push(EncuestasHomePage);


}
 getRandomInt(min, max):string {
  return Math.floor(Math.random() * (max - min)) + min;
}


ionViewDidLoad() 
{
  this.encuesta =new Encuesta;
  this.numero=Math.floor(Math.random() * (99919 -1 )) + 1;
  this.codigo=this.numero;
 
  console.log(this.codigo)

  
}

}