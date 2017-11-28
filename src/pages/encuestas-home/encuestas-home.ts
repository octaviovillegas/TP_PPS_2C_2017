import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
//import { AngularFireList } from 'angularfire2/database';
//import { EncuestaPage } from '../encuesta/encuesta';
import { Observable } from 'rxjs/Observable';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { EncuestaPage } from '../encuesta/encuesta';
import { DatePipe } from '@angular/common';
//import { RespuestaEncuestaDetallePage } from '../respuesta-encuesta-detalle/respuesta-encuesta-detalle';
@IonicPage()
@Component({
  selector: 'page-encuestas-home',
  templateUrl: 'encuestas-home.html',
})
export class EncuestasHomePage {

  //encuestas: FirebaseListObservable<any[]>;
  encuestas:FirebaseListObservable<any>;
  
    aulaMaterias = [];
  
    fechaActual: string;
    
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, public eDataProvider: EncuestasDataProvider,
    public modalCtrl: ModalController, public alertCtrl: AlertController
    , public datePipeCtrl: DatePipe) {
  
     this.encuestas = this.eDataProvider.getEncuestas();    
  
     this.fechaActual = this.datePipeCtrl.transform(Date.now(), 'yyyy-MM-dd');
  
     console.log(this.fechaActual);
     
    }
  
    enviarEncuesta(e){
      e.enviada=true;
      this.enviarEncuestaFB(e).then(res=>{
        this.showAlerOK("La encuesta se envio exitosamente");
      })
    }
  
    enviarEncuestaFB(e){
      return this.eDataProvider.enviarEncuestaGuardadaFB(e);
    }
  
    generarEncuesta(){
      this.navCtrl.push(EncuestaPage);
    }
  
    modificarEncuesta(encuesta){
      this.navCtrl.push(EncuestaPage, {data : encuesta});
    }
  
    eliminarEncuesta(encuesta){
      let alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Esta seguro que desea eliminar la encuesta',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.eDataProvider.eliminarEncuesta(encuesta);
            }
          }
        ]
      });
      alert.present();    
    }
  
    verEncuestaDetalle(encuesta){
      //this.navCtrl.push(RespuestaEncuestaDetallePage, {data: encuesta});
    }
  
    showAlerOK(mensaje: string) {
      let alert = this.alertCtrl.create({
        title: 'Info',
        subTitle: mensaje,
        buttons: ['OK']
      });
      alert.present();
    }
  
    showAlertError(mensaje: string) {
      let alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: mensaje,
        buttons: ['OK']
      });
      alert.present();
    }
  
  }