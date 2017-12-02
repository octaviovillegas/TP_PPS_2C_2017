import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import {  ModalController, ViewController, AlertController } from 'ionic-angular';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Encuesta } from "../../clases/encuesta";
/**
 * Generated class for the Graficos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {

   @ViewChild('doughnutCanvas1') doughnutCanvas1;
   @ViewChild('doughnutCanvas2') doughnutCanvas2;
   @ViewChild('doughnutCanvas3') doughnutCanvas3;
   
   doughnutChart1: any;
   doughnutChart2: any;
   doughnutChart3: any;

   fireDB: FirebaseListObservable<any>; 
   public cantB = 0;
   public cantRe = 0;;
   public cantM = 0;
   private encuesta:any;  
   private pregunta:string="";
   private codigo:string="";
   private opcion1:string="";
   private opcion2:string="";
   private opcion3:string="";
   
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams, public af: AngularFireDatabase) 
  {
    

    this.fireDB = af.list('/encuesta');

    this.fireDB.subscribe(dato => {dato.forEach(item => {
        
    if(item.respuesta1 == "Buena" && item.pregunta1 == "pregunta1")
    {
      this.cantB += 1;
      console.log("buena",this.cantB);
      
    }
    if(item.respuesta1 == "Regular" && item.pregunta1 == "pregunta1")
    {
      this.cantRe += 1;
      console.log("regular",this.cantRe);
      
    }
    if(item.respuesta1 == "Mala" && item.pregunta1 == "pregunta1")
    {
      this.cantM += 1;
      console.log("mala",this.cantM);
      
    }
   

  }); 
  
  
   this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
 
            type: 'doughnut',
            /*options: {
              config: [{
                animateRotate: false,
                animateScale: true                
              }]
            },*/
            data: {
                //labels: ["Red", /*"Blue", */"Yellow", "Green"/*, "Purple", "Orange"*/],
                labels: [this.opcion1, this.opcion2, this.opcion3/*, "Purple", "Orange"*/],
                datasets: [{
                    label: '# of Votes',
                    //data: [12, 19, 3, 5, 2, 3],
                    data: [this.cantB, this.cantRe, this.cantM],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        //'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)'                        
                        //'rgba(153, 102, 255, 0.2)',
                        //'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#4bc02a",
                        "#FFCE56",
                        "#FF6384"
                        //"#36A2EB",  azul
                       //"#FFCE56", amarillo
                       // "#4bc02a",
                        //"#36A2EB",
                        //"#FFCE56"
                    ]
                }]
            }
            
            
 
        });

            
     
  })

 }
 
 cancelarOpe(){
  this.view.dismiss();
}
 
  ionViewDidLoad() {
    this.encuesta = this.navParams.get('encuesta');
    this.codigo=this.encuesta.codigo;
    this.codigo=this.encuesta.codigo;
    this.pregunta = this.encuesta.pregunta;
    this.opcion1 = this.encuesta.opcion1;
    this.opcion2 = this.encuesta.opcion2;
    this.opcion3 = this.encuesta.opcion3;

        
  }

}
  

