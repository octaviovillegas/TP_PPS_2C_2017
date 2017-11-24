import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  public tab: string= "actual";
  //Actual
  public respuesta: string;
  //Crear
  private formCrear: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.formCrear = this.formBuilder.group({
        pregunta: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        respuestaA: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        respuestaB: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        tiempo: ['', Validators.compose([Validators.required])]
      });
  }
  
}
