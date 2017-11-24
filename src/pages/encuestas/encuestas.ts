import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  public tab: string;
  //Actual
  public respuesta: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
}
