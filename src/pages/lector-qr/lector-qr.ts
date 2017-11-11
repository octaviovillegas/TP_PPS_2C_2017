
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils2 } from '../../services/pictureUtils2.service';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../login/login';
//$IMPORTSTATEMENT

/**
 * Generated class for the LectorQrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//$IONICPAGE
@Component({
  selector: 'page-lector-qr',
  templateUrl: 'lector-qr.html',
})
export class LectorQrPage {

  codigo:string="";
  mostrarInfo=true;
  aula:string;
  materia:string;
  info:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner) {
      this.mostrarInfo=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LectorQrPage');
  }
async leerCodigo(){
  const result = await this.barcodeScanner.scan({showTorchButton: true});
  this.codigo = await result.text;
  //this.scannedCodes.push(this.scannedCode);
  if (this.codigo=="8c95def646b6127282ed50454b73240300dccabc​")
  {
    this.mostrarInfo=true;
    this.aula="Aula 5";
    this.materia="Matematica discreta"
    this.info= "Profesor: Pepito Cantidad de alumnos:89"
  }
  else if (this.codigo=="ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172​")
  {
    this.mostrarInfo=true;
    this.aula="Aula 10";
    this.materia="Metodologia"
    this.info= "Profesor: Juancito Cantidad de alumnos:8"
  }
  else if (this.codigo=="2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
  {
    this.mostrarInfo=true;
    this.aula="Aula 20";
    this.materia="Probabilidad"
    this.info= "Profesora: Lucy Cantidad de alumnos:9"
  }

/*  this.barcodeScanner.scan().then((barcodeData) => {
    // Success! Barcode data is here
    //this.codigo=barcodeData;
   }, (err) => {
       // An error occurred
   });*/
   this.codigo="";
  
}
}
