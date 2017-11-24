import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  public tab: string= "estadisticas";
  //Actual
  public respuesta: string;
  //Crear
  private formCrear: FormGroup;
  //Estadisticas
  @ViewChild('tortaCanvas') tortaCanvas;

  tortaGrafico: any;

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

  public ionViewDidLoad() {
    
           this.tortaGrafico = new Chart(this.tortaCanvas.nativeElement, {
    
               type: 'pie',
               data: {
                   labels: ["Red", "Blue"],
                   datasets: [{
                       label: '# of Votes',
                       data: [12, 19],
                       backgroundColor: [
                           '#FF6384',
                           '#36A2EB',
                       ],
                       hoverBackgroundColor: [
                           "#FF6384",
                           "#36A2EB",
                       ]
                   }]
               }
           });
       }
}
