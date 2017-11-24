import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
   public cantM = 0;;
   public cantSi = 0;;
   public cantNo = 0;;
   public cantSisi = 0;;
   public cantNono = 0;;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) 
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
    if(item.respuesta2 == "Si" && item.pregunta2 == "pregunta2")
    {
      this.cantSi += 1;
      console.log("si",this.cantSi);
      
    }
    if(item.respuesta2 == "No" && item.pregunta2 == "pregunta2")
    {
      this.cantNo += 1;
      console.log("no",this.cantNo);
      
    }
    if(item.respuesta3 == "Sisi" && item.pregunta3 == "pregunta3")
    {
      this.cantSisi += 1;
      console.log("sisi",this.cantSisi);
      
    }
    if(item.respuesta3 == "Nono" && item.pregunta3 == "pregunta3")
    {
      this.cantNono += 1;
      console.log("nono",this.cantNono);
      
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
                labels: ["Buena", /*"Blue", */"Regular", "Mala"/*, "Purple", "Orange"*/],
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

            this.doughnutChart2 = new Chart(this.doughnutCanvas2.nativeElement, {
 
            type: 'doughnut',
            /*options: {
              config: [{
                animateRotate: false,
                animateScale: true                
              }]
            },*/
            data: {
                //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                labels: ["Si", "No"],
                datasets: [{
                    label: '# of Votes',
                    //data: [12, 19, 3, 5, 2, 3],
                    data: [this.cantSi, this.cantNo],
                    backgroundColor: [
                        //'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        //'rgba(255, 206, 86, 0.2)',
                        //'rgba(75, 192, 192, 0.2)',
                        //'rgba(153, 102, 255, 0.2)',
                        //'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        //"#FF6384",
                        "#36A2EB",
                        "#FF6384",
                        //"#FFCE56",
                        //"#FF6384",
                        //"#36A2EB",
                       // "#FFCE56"
                    ]
                }]
            }
            
            
 
        });

            this.doughnutChart3 = new Chart(this.doughnutCanvas3.nativeElement, {
 
            type: 'doughnut',
            /*options: {
              config: [{
                animateRotate: false,
                animateScale: true                
              }]
            },*/
            data: {
                //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                labels: ["Si", "No"],
                datasets: [{
                    label: '# of Votes',
                    //data: [12, 19, 3, 5, 2, 3],
                    data: [this.cantSisi, this.cantNono],
                    backgroundColor: [
                        //'rgba(255, 99, 132, 0.2)',
                        //'rgba(54, 162, 235, 0.2)',
                        //'rgba(255, 206, 86, 0.2)',
                        //'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                       // "#FF6384",
                        //"#36A2EB",
                       // "#FFCE56",
                        //"#FF6384",
                        "#CCB3FF",
                        "#FFCE56"
                    ]
                }]
            }
            
            
 
        });
  
  })

 }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Graficos');

        
  }

}
  

