import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
//import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated"
import { AngularFireAuth } from 'angularfire2/auth';
import { EnviarEncuestaPage } from '../enviar-encuesta/enviar-encuesta';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

  
  encuesta = { nombreEncuesta: '', duracion: 0, autor: '', respondida: false, enviada: false, preguntas: [{isOpen: false, texto: '' }], destinatarios: [{}], fechaIngreso: '' };
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
    //console.log(this.creadorDelaEncuesta);      
    this.myForm = formBuilder.group({
      nombreEncuesta: ['', Validators.compose([Validators.required])],
      fechaIngreso: ['', Validators.compose([Validators.required])],
      fechaEgreso: ['', Validators.compose([Validators.required])],
      preguntaTexto: ['', Validators.compose([Validators.required])],
      tipoRespuesta: ['', Validators.compose([Validators.required])],
      cantidadOpciones: ['', Validators.compose([Validators.required])],
      opciones: ['', Validators.compose([Validators.required])],

    });

    this.seModifica = this.navParams.get('data');
    if (this.seModifica) {
      this.encuesta = this.seModifica;
      this.modificar = true;
    }
  }

  getUser() {
    return this.afAuth.auth.currentUser.email;
  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  ionViewDidLoad() {
  }

  siguiente() {
    let errorStr = '';
    if (this.encuesta.nombreEncuesta == '') {
      errorStr = errorStr + ' ' + 'Nombre de la Encuesta-';
    } 
    if (this.encuesta.duracion == 0) {
      errorStr = errorStr + ' ' + 'Duracion-';
    }
    let band=0;
    this.encuesta.preguntas.forEach(p=>{
      if(p.texto == '' && band==0){
        errorStr = errorStr + ' ' + 'Pregunta-';
        band++;
      }
    });

    if(errorStr != ''){
      this.showAlertError('Debe completar los campos'+ errorStr);
    }else{
      var jsonEncuesta = { encuesta: this.encuesta, modificar: this.modificar };
      this.navCtrl.push(EnviarEncuestaPage, jsonEncuesta);
    }
    
  }

  agregarPregunta() {
    // this.encuesta.preguntas.push({texto:''});
    //this.encuesta.preguntas.push({texto:'',isOpen: false });
    this.encuesta.preguntas.forEach(pregunta => {
      pregunta.isOpen = false;
    });
    this.encuesta.preguntas.push({ isOpen: false, texto: '' });

  }

  tipoRespuestaSelected(pregunta) {
    if (pregunta.tipoRespuesta == 'OPINION') {
      pregunta.opciones = [];
    } else if (pregunta.tipoRespuesta == 'UNASOLARESPUESTA') {
      pregunta.opciones = [];
    }
  }

  generarItemsOpciones(pregunta) {
    console.log(JSON.stringify(pregunta));
    pregunta.opciones = [];
    for (var i = 1; i <= pregunta.cantidadOpciones; i++) {
      pregunta.opciones.push("");
    }
  }

  generarItemsOpcionesParaUnaSolaRespuesta(pregunta) {
    console.log(JSON.stringify(pregunta));
    pregunta.opciones = [];
    if (pregunta.opcionesUnaSolaRespuesta == '1 a 2') {
      pregunta.opciones.push("", "");
    } else if (pregunta.opcionesUnaSolaRespuesta == '1 a 3') {
      pregunta.opciones.push("", "", "");
    }
  }

  eliminarPregunta(pregunta) {
    var preguntasAux = [];
    this.encuesta.preguntas.forEach(preguntaItem => {
      if (preguntaItem != pregunta) {
        preguntasAux.push(preguntaItem);
      }
    })
    this.encuesta.preguntas = preguntasAux;
  }

  showAlertError(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: 'ERROR!',
      subTitle: mensaje,
      buttons: ['aceptar']
    });
    alert.present();
  }

  showAlerOK(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: mensaje,
      buttons: ['aceptar']
    });
    alert.present();
  }

  validar() {
    if (this.encuesta.nombreEncuesta == "") {
      alert("Se deben completar el nombre de la encuesta")
    }

    let fecha = new Date();

    console.log(fecha.getHours);
    console.log(fecha.getMinutes);

  }



}