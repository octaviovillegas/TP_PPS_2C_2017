
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils2 } from '../../services/pictureUtils2.service';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Subscription } from 'rxjs/Subscription';
import { BotonesPage } from '../botones/botones';
import { EstadisticasPage } from '../estadisticas/estadisticas';
import { RealizarEncuestaPage } from '../realizar-encuesta/realizar-encuesta';
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
    private barcodeScanner: BarcodeScanner, public auth:AuthProvider) {
      this.mostrarInfo=false;
      this.codigo="";
      this.aula="";
      this.materia="";
      this.info="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LectorQrPage');
  }
async leerCodigo(){
  const result = await this.barcodeScanner.scan({showTorchButton: true});
  this.codigo = await result.text;
  //this.scannedCodes.push(this.scannedCode);
  if (this.codigo=="8c95def646b6127282ed50454b73240300dccabc​")
  { if (this.auth.getUser()=="usuario@usuario.com")
  {
    this.mostrarInfo=true;
    this.aula="Aula 5";
    this.materia="Matematica discreta"
    this.info= "Cantidad Alumnos: 50"
  }
  if (this.auth.getUser()=='invitado@invitado.com')
  {
    alert("Usted es Alumno- No tiene permiso para ver los datos");
    this.navCtrl.push(BotonesPage);
  }
  
  }
   if (this.codigo=="ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172")
  {if (this.auth.getUser()=='invitado@invitado.com')
  {
    this.mostrarInfo=true;
    this.aula="Aula 10";
    this.materia="Metodologia"
    this.info= "Profesor: Juancito "}
    if (this.auth.getUser()=="usuario@usuario.com")
    { alert("Usted es Profesor- No tiene permiso para ver los datos");
    this.navCtrl.push(BotonesPage);}
  }

 if (this.codigo=="2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
  {
    if (this.auth.getUser()=="usuario@usuario.com")
    {
      this.navCtrl.push(EstadisticasPage);
    }
    if (this.auth.getUser()=='invitado@invitado.com')
    {
      this.navCtrl.push(RealizarEncuestaPage);
    }
 
  }

/*  this.barcodeScanner.scan().then((barcodeData) => {
    // Success! Barcode data is here
    //this.codigo=barcodeData;
   }, (err) => {
       // An error occurred
   });*/
   
   this.codigo="";
   this.aula="";
   this.materia="";
   this.info="";
  
}
}
