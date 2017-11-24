import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from "@ionic-native/barcode-scanner";

@IonicPage()
@Component({
  selector: 'page-form-alumnos-qr',
  templateUrl: 'form-alumnos-qr.html',
})
export class FormAlumnosQrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController

  ) {}



  ionViewDidLoad() {

  }

  async encodeData(){
    let resultado = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, 'probando encode data');
    let alert = this.alertCtrl.create({
        title: 'encode',
        message:resultado
    });
    alert.present();
  }





}
