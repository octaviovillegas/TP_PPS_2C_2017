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

  private codigo:string;
  private pregunta:string;
  private opcion1:string;
  private opcion2:string;
  private opcion3:string;
  private encuesta:Encuesta;
  private fechaE:string;
  private fechaI:string;
  private alumno:Alumno;
  

  /*
  encuesta = { nombreEncuesta: '', duracion: 0, autor: '',
   respondida: false, enviada: false, 
   preguntas: [{isOpen: false, texto: '' }],
    destinatarios: [{}], fechaIngreso: '' };*/


  opcionesSelect = [{ valor: '1' }, { valor: '2' }, { valor: '3' }, { valor: '4' }, { valor: '5' }, { valor: '6' }];
  cantidadOpcionesDisponiblesSelect = [{ valor: '1 a 2' }, { valor: '1 a 3' }];
  creadorDelaEncuesta = '';
  deshabilitar = false;
  modificar = false;
  seModifica = null;
  duracion = [{ valor: 5 }, { valor: 10 }, { valor: 15 }, { valor: 20 }, { valor: 25 }, { valor: 30 }, { valor: 35 },
  { valor: 40 }, { valor: 45 }, { valor: 50 }, { valor: 55 }, { valor: 60 },]
  public myForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public afDB: AngularFireDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public modalCtrl: ModalController,
    public eDataProvider: EncuestasDataProvider, 
    public formBuilder: FormBuilder, public datePipeCtrl: DatePipe) {
    //this.creadorDelaEncuesta = this.getUser();
    /*  
    this.myForm = formBuilder.group({
      nombreEncuesta: ['', Validators.compose([Validators.required])],
      fechaIngreso: ['', Validators.compose([Validators.required])],
      fechaEgreso: ['', Validators.compose([Validators.required])],
      preguntaTexto: ['', Validators.compose([Validators.required])],
      tipoRespuesta: ['', Validators.compose([Validators.required])],
      cantidadOpciones: ['', Validators.compose([Validators.required])],
      opciones: ['', Validators.compose([Validators.required])],*/
      this.fechaE = this.datePipeCtrl.transform(Date.now(), 'yyyy-MM-dd');



    this.seModifica = this.navParams.get('data');
    if (this.seModifica) {
      this.encuesta = this.seModifica;
      this.modificar = true;
    }
  }
 

  

  
  ingresarEncuesta(){
    console.log('alumno form: ', this.codigo);
    
    console.log('alumno form: ', this.fechaE);
    console.log('alumno form: ', this.fechaI);
    console.log('alumno form: ', this.pregunta);
    console.log('alumno form: ', this.opcion1);
    console.log('alumno form: ', this.opcion2);
    console.log('alumno form: ', this.opcion3);
    console.log('alumno form: ', this.encuesta); 
    this.alumno.setLegajo(this.codigo);
   /* this.encuesta.setfechaE(this.fechaE);
    this.encuesta.setfechaI(this.fechaI);
    this.encuesta.setPregunta(this.pregunta);
    this.encuesta.setOpcion1(this.opcion1);
    this.encuesta.setOpcion2(this.opcion2);
    this.encuesta.setOpcion3(this.opcion3);

    this.eDataProvider.guardarEncuesta(this.encuesta);*/
    this.navCtrl.push(EncuestasHomePage);


}

showAlertError(mensaje: string) {
  let alert = this.alertCtrl.create({
    title: 'ERROR!',
    subTitle: mensaje,
    buttons: ['aceptar']
  });
  alert.present();
}


}